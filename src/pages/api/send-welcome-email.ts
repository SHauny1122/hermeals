import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { email } = req.body;

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: 'Her Meals <onboarding@resend.dev>',
        to: email,
        subject: 'Welcome to Her Meals! 🌟',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h1 style="color: #6366F1;">Welcome to Her Meals!</h1>
            <p>Hi there,</p>
            <p>Thank you for joining Her Meals! We're excited to be part of your health and wellness journey.</p>
            <p>With your new account, you now have access to:</p>
            <ul>
              <li>Personalized meal plans</li>
              <li>Exclusive smoothie recipes</li>
              <li>30-day fitness calendar</li>
              <li>Weekly shopping lists</li>
            </ul>
            <p>Ready to get started? <a href="https://fitherway-diet-plans.firebaseapp.com" style="color: #6366F1;">Log in to your account</a></p>
            <p>If you have any questions, feel free to reach out to our support team.</p>
            <p>Best regards,<br>The Her Meals Team</p>
          </div>
        `,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      return res.status(200).json({ message: 'Email sent successfully' });
    } else {
      throw new Error(data.message || 'Failed to send email');
    }
  } catch (error) {
    console.error('Error sending email:', error);
    return res.status(500).json({ message: 'Failed to send email' });
  }
}
