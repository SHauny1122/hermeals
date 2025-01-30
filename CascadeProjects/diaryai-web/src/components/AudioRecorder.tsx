'use client';

import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Mic, MicOff } from 'lucide-react';

interface AudioRecorderProps {
  onStartRecording?: () => boolean;
}

export const AudioRecorder = ({ onStartRecording }: AudioRecorderProps) => {
  const [recording, setRecording] = useState(false);
  const [transcription, setTranscription] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const chunks = useRef<Blob[]>([]);

  const startRecording = async () => {
    // Check if we can record (usage limit)
    if (onStartRecording && !onStartRecording()) {
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          channelCount: 1,
          sampleRate: 16000,
        } 
      });
      
      mediaRecorder.current = new MediaRecorder(stream, {
        mimeType: 'audio/webm',
      });
      
      chunks.current = [];

      mediaRecorder.current.ondataavailable = (event) => {
        if (event.data.size > 0) chunks.current.push(event.data);
      };

      mediaRecorder.current.onstop = async () => {
        const audioBlob = new Blob(chunks.current, { type: 'audio/webm' });
        await uploadAudio(audioBlob);
        
        // Stop all tracks
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.current.start(1000); // Record in 1-second chunks
      setRecording(true);
    } catch (error) {
      console.error('Error accessing microphone:', error);
      alert('Could not access microphone. Please ensure you have granted permission.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorder.current && recording) {
      mediaRecorder.current.stop();
      setRecording(false);
      setIsLoading(true);
    }
  };

  const uploadAudio = async (audioBlob: Blob) => {
    try {
      // Convert blob to base64
      const reader = new FileReader();
      reader.readAsDataURL(audioBlob);
      reader.onloadend = async () => {
        const base64Audio = reader.result as string;
        const base64Data = base64Audio.split(',')[1]; // Remove data URL prefix

        const response = await fetch('/api/transcribe', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ audio: base64Data }),
        });

        if (!response.ok) {
          throw new Error('Transcription failed');
        }

        const data = await response.json();
        setTranscription(data.text);
        setIsLoading(false);
      };
    } catch (error) {
      console.error('Error uploading audio:', error);
      setIsLoading(false);
      alert('Failed to transcribe audio. Please try again.');
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      <div className="flex flex-col items-center gap-4">
        <Button
          onClick={recording ? stopRecording : startRecording}
          size="lg"
          className={`rounded-full p-8 ${recording ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-500 hover:bg-blue-600'}`}
        >
          {recording ? <MicOff className="h-8 w-8" /> : <Mic className="h-8 w-8" />}
        </Button>
        <p className="text-sm text-gray-500">
          {recording ? 'Tap to stop recording' : 'Tap to start recording'}
        </p>
      </div>

      {isLoading && (
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" />
          <p className="mt-2 text-sm text-gray-500">Transcribing your audio...</p>
        </div>
      )}

      {transcription && !isLoading && (
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-sm font-medium text-gray-900 mb-2">Transcription:</h3>
          <p className="text-gray-600">{transcription}</p>
        </div>
      )}
    </div>
  );
};

export default AudioRecorder;
