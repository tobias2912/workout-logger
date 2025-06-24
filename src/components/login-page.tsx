"use client";

import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "@/lib/firebase";
import { Button } from "@/components/ui/button";
import { Dumbbell } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function LoginPage() {
  const { toast } = useToast();

  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error("Error signing in with Google", error);
      toast({
        title: "Login Failed",
        description: "There was an error while trying to log you in. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background p-8 transition-colors duration-500">
      <div className="flex flex-col items-center text-center">
        <div className="p-4 rounded-full bg-primary mb-6 shadow-lg">
          <Dumbbell className="h-12 w-12 text-primary-foreground" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-foreground tracking-tighter">
          Fitness Chronicle
        </h1>
        <p className="mt-4 max-w-md text-lg text-muted-foreground">
          Your personal journey to strength and wellness, tracked and visualized.
        </p>
        <Button onClick={handleLogin} className="mt-8" size="lg">
          <svg role="img" viewBox="0 0 24 24" className="mr-2 h-4 w-4"><path fill="currentColor" d="M12.48 10.92v3.28h7.84c-.24 1.84-.85 3.18-1.73 4.1-1.02 1.02-2.62 1.9-4.73 1.9-3.87 0-7-3.13-7-7s3.13-7 7-7c1.93 0 3.38.79 4.34 1.74l2.06-2.06C18.15 1.16 15.65 0 12.48 0 5.6 0 0 5.6 0 12.5S5.6 25 12.48 25c3.24 0 5.73-1.12 7.64-3.03 2.01-2.01 2.62-4.82 2.62-7.37v-.55h-10.2z"></path></svg>
          Sign In with Google
        </Button>
      </div>
    </main>
  );
}
