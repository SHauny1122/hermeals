import { NextResponse } from 'next/server';

const MAX_RETRIES = 3;
const RETRY_DELAY = 5000; // 5 seconds

async function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function transcribeWithRetry(audioData: string, retryCount = 0): Promise<any> {
  try {
    const response = await fetch('https://api-inference.huggingface.co/models/openai/whisper-large-v3', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.HUGGING_FACE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        inputs: audioData,
        model: "openai/whisper-large-v3",
        parameters: {
          return_timestamps: false
        }
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Hugging Face API error status:', response.status);
      console.error('Hugging Face API error headers:', Object.fromEntries(response.headers.entries()));
      console.error('Hugging Face API error body:', errorText);

      // Check if it's a "model too busy" error and we haven't exceeded max retries
      if (errorText.includes('Model too busy') && retryCount < MAX_RETRIES) {
        console.log(`Model busy, retrying in ${RETRY_DELAY/1000} seconds... (Attempt ${retryCount + 1}/${MAX_RETRIES})`);
        await sleep(RETRY_DELAY);
        return transcribeWithRetry(audioData, retryCount + 1);
      }

      throw new Error(`Transcription failed: ${errorText}`);
    }

    return response.json();
  } catch (error) {
    if (retryCount < MAX_RETRIES) {
      console.log(`Error occurred, retrying in ${RETRY_DELAY/1000} seconds... (Attempt ${retryCount + 1}/${MAX_RETRIES})`);
      await sleep(RETRY_DELAY);
      return transcribeWithRetry(audioData, retryCount + 1);
    }
    throw error;
  }
}

export async function POST(request: Request) {
  try {
    const { audio, mimeType } = await request.json();

    if (!audio) {
      return NextResponse.json(
        { error: 'No audio data provided' },
        { status: 400 }
      );
    }

    // Convert base64 to buffer
    const audioBuffer = Buffer.from(audio, 'base64');

    console.log('Audio MIME type:', mimeType);
    console.log('Audio data size:', audioBuffer.length);

    const result = await transcribeWithRetry(audio);

    // According to docs, response should be { text: "transcription" }
    if (result && result.text) {
      return NextResponse.json({ text: result.text });
    } else {
      console.error('Unexpected API response format:', result);
      throw new Error('No transcription text in response');
    }

  } catch (error) {
    console.error('Error in transcribe route:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to transcribe audio' },
      { status: 500 }
    );
  }
}
