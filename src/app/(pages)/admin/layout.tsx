"use client";
import { useUser } from "@/app/utilities/contexts/user/UserContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const { user } = useUser();

  const router = useRouter();

  useEffect(() => {
    if(!user?.isSignedIn) {
      router.push("/");
    }
  }, [router, user?.isSignedIn]);

  return <>{children}</>;
}

