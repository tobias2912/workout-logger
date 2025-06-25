"use client";

import { useState, useEffect, useMemo } from "react";
import { collection, query, where, onSnapshot, Timestamp, orderBy } from "firebase/firestore";
import { signOut } from "firebase/auth";
import { format } from "date-fns";
import { LogOut, Plus, User as UserIcon } from "lucide-react";

import { useAuth } from "@/hooks/use-auth";
import { db, auth } from "@/lib/firebase";
import type { Workout } from "@/types";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { AddWorkoutSheet } from "./add-workout-sheet";
import { WorkoutDetails } from "./workout-details";
import { Skeleton } from "./ui/skeleton";

export default function Dashboard() {
  const { user } = useAuth();
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [isDetailsSheetOpen, setIsDetailsSheetOpen] = useState(false);
  const [isAddSheetOpen, setIsAddSheetOpen] = useState(false);

  useEffect(() => {
    if (!user) return;

    setLoading(true);
    const q = query(
      collection(db, "workouts"), 
      where("userId", "==", user.uid),
      orderBy("date", "desc")
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const userWorkouts = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      })) as Workout[];
      setWorkouts(userWorkouts);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user]);

  const workoutDays = useMemo(() => workouts.map(w => w.date.toDate()), [workouts]);
  
  const workoutsForSelectedDay = useMemo(() => {
    if (!selectedDate) return [];
    const startOfDay = new Date(selectedDate.setHours(0, 0, 0, 0));
    const endOfDay = new Date(selectedDate.setHours(23, 59, 59, 999));
    
    return workouts.filter(workout => {
        const workoutDate = workout.date.toDate();
        return workoutDate >= startOfDay && workoutDate <= endOfDay;
    });
  }, [workouts, selectedDate]);

  const handleDayClick = (day: Date) => {
    setSelectedDate(day);
    setIsDetailsSheetOpen(true);
  };
  
  return (
    <div className="flex min-h-screen w-full flex-col">
      <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-card px-4 md:px-6 z-10">
        <h1 className="text-xl font-semibold">Fitness Chronicle</h1>
        <div className="flex items-center gap-4 ml-auto">
          <AddWorkoutSheet open={isAddSheetOpen} onOpenChange={setIsAddSheetOpen}>
            <Button size="sm" className="gap-1">
              <Plus className="h-4 w-4" />
              <span className="sr-only sm:not-sr-only">Add Workout</span>
            </Button>
          </AddWorkoutSheet>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user?.photoURL ?? undefined} alt={user?.displayName ?? "User"} />
                  <AvatarFallback><UserIcon /></AvatarFallback>
                </Avatar>
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>{user?.displayName}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => signOut(auth)}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <Card>
          <CardHeader>
            <CardTitle>Workout Calendar</CardTitle>
          </CardHeader>
          <CardContent className="flex justify-center">
            {loading ? (
              <div className="w-full p-4">
                <Skeleton className="h-[270px] w-full" />
              </div>
            ) : (
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                onDayClick={handleDayClick}
                modifiers={{ withWorkout: workoutDays }}
                modifiersClassNames={{ withWorkout: 'day-with-workout' }}
                className="p-0"
              />
            )}
          </CardContent>
        </Card>
      </main>

      <Sheet open={isDetailsSheetOpen} onOpenChange={setIsDetailsSheetOpen}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>
              {selectedDate ? format(selectedDate, "MMMM d, yyyy") : "Workout Details"}
            </SheetTitle>
             <SheetDescription>
                {workoutsForSelectedDay.length > 0 
                    ? `You have ${workoutsForSelectedDay.length} workout(s) today.`
                    : `No workouts logged for this day.`}
            </SheetDescription>
          </SheetHeader>
          <WorkoutDetails workouts={workoutsForSelectedDay} />
        </SheetContent>
      </Sheet>
    </div>
  );
}
