"use client";

import { useAuth } from "@/hooks/use-auth";
import Dashboard from "@/components/dashboard";
import LoginPage from "@/components/login-page";

export default function Home() {
  const { user } = useAuth();

  return user ? <Dashboard /> : <LoginPage />;
}
