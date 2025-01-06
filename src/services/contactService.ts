import { addDoc, collection } from 'firebase/firestore';
import { db } from '../config/firebase';

interface ContactMessage {
  email: string;
  message: string;
  timestamp: number;
  status: 'new' | 'read' | 'responded';
}

export const contactService = {
  async submitMessage(email: string, message: string): Promise<void> {
    const contactMessage: ContactMessage = {
      email,
      message,
      timestamp: Date.now(),
      status: 'new'
    };

    await addDoc(collection(db, 'contactMessages'), contactMessage);
  }
};
