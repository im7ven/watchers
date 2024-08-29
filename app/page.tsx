"use client";
import { Button } from "@radix-ui/themes";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const { data } = useSession();
  return (
    <main>
      {data && data.user?.name}
      <Button>Testing Radix</Button>
      <Link href="api/auth/signin">Login</Link>
      <Link href="api/auth/signout">Logout</Link>
    </main>
  );
}
