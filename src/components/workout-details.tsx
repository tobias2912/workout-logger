"use client";

import type { Workout } from "@/types";
import { format } from "date-fns";
import { workoutIcons } from "./icons";
import { Separator } from "./ui/separator";

interface WorkoutDetailsProps {
    workouts: Workout[];
}

export function WorkoutDetails({ workouts }: WorkoutDetailsProps) {
    if (workouts.length === 0) {
        return <p className="text-muted-foreground text-center py-8">No workouts recorded for this day.</p>;
    }
    
    return (
        <div className="space-y-4 pt-4">
            {workouts.map((workout, index) => {
                const Icon = workoutIcons[workout.type];
                return (
                    <div key={workout.id}>
                        <div className="flex items-start gap-4">
                            <div className="bg-primary/10 p-3 rounded-full border">
                                <Icon className="h-6 w-6 text-primary" />
                            </div>
                            <div className="flex-1">
                                <p className="font-semibold capitalize text-foreground">{workout.type}</p>
                                <div className="text-sm text-muted-foreground">
                                    <span>{workout.duration} minutes</span>
                                    {workout.distance && <span> &middot; {workout.distance} km</span>}
                                </div>
                                {workout.notes && <p className="mt-2 text-sm text-foreground/80">{workout.notes}</p>}
                            </div>
                        </div>
                        {index < workouts.length - 1 && <Separator className="my-4" />}
                    </div>
                )
            })}
        </div>
    );
}
