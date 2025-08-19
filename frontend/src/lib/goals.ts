import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';

// Based on design.md, but simplified for the creation form
// We will not set all fields on creation, some are for aggregation
export interface GoalFormData {
  name: string;
  description?: string;
  targetAmount: number;
  initialAmount: number;
  monthlyAmount: number;
  // targetDate will be calculated or handled separately
}

// Full Goal type as per design.md
export interface Goal {
  id: string;
  name: string;
  description?: string;
  targetAmount: number;
  monthlyAmount: number;
  initialAmount: number;
  currentAmount: number;
  targetDate?: Date;
  targetType: 'date' | 'duration';
  sortOrder: number;
  isCompleted: boolean;
  isDeleted: boolean;
  stats: {
    totalDeposited: number;
    transactionCount: number;
    lastDepositDate?: Date;
    progress: number;
  };
  createdAt: Date;
  updatedAt: Date;
}


export const addGoal = async (uid: string, goalData: GoalFormData) => {
  if (!uid) {
    throw new Error("User ID is required to add a goal.");
  }

  const goalsCollectionRef = collection(db, 'users', uid, 'goals');

  const newGoal = {
    ...goalData,
    currentAmount: goalData.initialAmount,
    targetType: 'duration', // Defaulting for now
    sortOrder: 0, // Default value, will be handled by reordering feature
    isCompleted: false,
    isDeleted: false,
    stats: {
      totalDeposited: goalData.initialAmount,
      transactionCount: goalData.initialAmount > 0 ? 1 : 0,
      lastDepositDate: goalData.initialAmount > 0 ? serverTimestamp() : null,
      progress: (goalData.initialAmount / goalData.targetAmount) * 100,
    },
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  };

  try {
    const docRef = await addDoc(goalsCollectionRef, newGoal);
    console.log("Goal added with ID: ", docRef.id);
    return docRef;
  } catch (error) {
    console.error("Error adding goal: ", error);
    throw error;
  }
};
