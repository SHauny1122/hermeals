const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

exports.sendWelcomeEmail = functions.auth.user().onCreate((user) => {
  const email = user.email;
  const displayName = user.displayName || 'Valued Customer';

  // Create the email document in the 'mail' collection
  return admin.firestore().collection('mail').add({
    to: email,
    from: 'shauny1122@gmail.com', // Make sure this matches exactly what you set in the extension
    toUids: [user.uid], // Add this line
    message: {
      subject: 'Welcome to HerMeal! ',
      text: `Welcome to HerMeal! We're excited to have you join us.`, // Add plain text version
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #4F46E5;">Welcome to HerMeal! </h1>
          <p>Hi ${displayName},</p>
          <p>Thank you for joining HerMeal! We're excited to help you on your journey to healthier eating with our scientifically planned meal plans.</p>
          <p>Here's what you can do now:</p>
          <ul>
            <li>Browse our meal plans</li>
            <li>Create your personalized diet profile</li>
            <li>Explore healthy recipes</li>
          </ul>
          <p>If you have any questions, feel free to reach out to our support team.</p>
          <p>Best regards,<br>The HerMeal Team</p>
        </div>
      `
    }
  })
  .then(() => {
    console.log('Welcome email queued for:', email);
    return null;
  })
  .catch((error) => {
    console.error('Error queuing welcome email:', error);
    return null;
  });
});
