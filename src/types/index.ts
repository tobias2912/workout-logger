import { type Timestamp } from "firebase/firestore";

export type WorkoutType = "running" | "weightlifting" | "cardio" | "yoga";

export interface Workout {
  id: string;
  userId: string;
  date: Timestamp;
  type: WorkoutType;
  duration: number; // in minutes
  distance?: number; // in km
  notes?: string;
  createdAt: Timestamp;
}

export interface WorkoutFormData {
  date: Date;
  type: WorkoutType;
  duration: number;
  distance?: number;
  notes?: string;
}
