import { collection, doc, getDocs, addDoc, updateDoc, deleteDoc, query, orderBy, where } from 'firebase/firestore';
import { db } from '../config/firebase';

export interface WeightEntry {
  id?: string;
  date: string;
  timestamp: number;
  weight: number;
  unit: 'kg' | 'lbs';
}

export const weightService = {
  // Get all weight entries for a user
  async getWeightEntries(userId: string): Promise<WeightEntry[]> {
    const entriesRef = collection(db, 'users', userId, 'weightEntries');
    const q = query(entriesRef, orderBy('date', 'desc'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as WeightEntry));
  },

  // Add a new weight entry
  async addWeightEntry(userId: string, entry: Omit<WeightEntry, 'id' | 'timestamp'>): Promise<string> {
    const entryWithTimestamp = {
      ...entry,
      timestamp: Date.now()
    };
    const entriesRef = collection(db, 'users', userId, 'weightEntries');
    const docRef = await addDoc(entriesRef, entryWithTimestamp);
    return docRef.id;
  },

  // Update a weight entry
  async updateWeightEntry(userId: string, entryId: string, entry: Partial<WeightEntry>): Promise<void> {
    const entryRef = doc(db, 'users', userId, 'weightEntries', entryId);
    await updateDoc(entryRef, entry);
  },

  // Delete a weight entry
  async deleteWeightEntry(userId: string, entryId: string): Promise<void> {
    const entryRef = doc(db, 'users', userId, 'weightEntries', entryId);
    await deleteDoc(entryRef);
  }
};
