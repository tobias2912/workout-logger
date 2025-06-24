"use server";

import { revalidatePath } from "next/cache";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import type { WorkoutFormData } from "@/types";

// This is a server action. It will only run on the server.
// It is safe to use server-side logic and secrets here.

export async function addWorkout(data: WorkoutFormData) {
  // This is a placeholder for server-side authentication.
  // In a real app, you would get the user from the session.
  // For this example, we're relying on the client to be authenticated,
  // but a server-side check is always better.
  const user = auth.currentUser;

  if (!user) {
    // In a real scenario, you'd get the user from a server session.
    // This check is mostly for show in this client-driven auth model.
    // For a more robust solution, you'd use NextAuth.js or similar.
    return { error: "You must be logged in to add a workout." };
  }

  try {
    await addDoc(collection(db, "workouts"), {
      ...data,
      date: Timestamp.fromDate(data.date),
      userId: user.uid,
      createdAt: Timestamp.now(),
    });
    
    revalidatePath("/");
    return { success: "Workout added successfully!" };
  } catch (error) {
    console.error("Error adding workout: ", error);
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred.";
    return { error: `Failed to add workout. ${errorMessage}` };
  }
}
