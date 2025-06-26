import { Dumbbell, Footprints, HeartPulse, type LucideProps } from "lucide-react";
import type { WorkoutType } from "@/types";

export const workoutIcons: Record<WorkoutType, React.ElementType<LucideProps>> = {
  running: Footprints,
  weightlifting: Dumbbell,
  cardio: HeartPulse,
  yoga: (props: LucideProps) => (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      {...props}
    >
      <path d="M2 17c.6.7 1.3 1 2.3 1 .8 0 1.6-.3 2.2-.8.6-.5.9-1.3.9-2.2s-.3-1.7-.9-2.2c-1.2-1.2-3.1-1.2-4.3 0C1.3 14 1 15.1 1 16.2c0 1 .4 1.9 1 2.6V21h3"/>
      <path d="M17.6 21c.2 0 .4-.1.6-.2.5-.3.8-.8.8-1.4 0-.6-.2-1.1-.6-1.4-.4-.3-.9-.4-1.4-.4-1.2 0-2.1.9-2.1 2.1 0 .6.2 1.1.6 1.5.4.3.9.4 1.4.4h.7"/>
      <path d="M19.9 9.3c.6-.6 1-1.4 1-2.3 .1-1.7-1.2-3.2-2.9-3.3-1.2-.1-2.3.4-3.1 1.2"/>
      <path d="M6.2 4.6c.4-.4 1-.6 1.6-.6.8 0 1.6.3 2.2.9.6.5.9 1.3.9 2.2s-.3 1.7-.9 2.2c-1.2 1.2-3.1 1.2-4.3 0C5.1 8.7 4.8 7.6 4.8 6.5c0-1 .4-1.9 1-2.6"/>
      <path d="M11.9 21h7.6"/>
      <path d="m14 12 2-2 2 2"/>
      <path d="M8 12a2 2 0 1 0-4 0 2 2 0 0 0 4 0Z"/>
      <path d="M16 12a2 2 0 1 0-4 0 2 2 0 0 0 4 0Z"/>
    </svg>
  ),
};
