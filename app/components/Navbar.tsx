"use client";
import { Flex, TextField } from "@radix-ui/themes";
import { useSession } from "next-auth/react";
import Link from "next/link";
import UserDropDown from "./UserDropDown";
import { BsSearch } from "react-icons/bs";

const Navbar = () => {
  const { data: sessionData, status } = useSession();

  return (
    <header className="border-b border-[rgba(255,255,255,.2)] py-3">
      <nav>
        <Flex justify="between" align="center" gap="5">
          <h1>LOGO</h1>
          <TextField.Root className="w-full" placeholder="Search the docs…">
            <TextField.Slot>
              <BsSearch />
            </TextField.Slot>
          </TextField.Root>
          {status === "authenticated" ? (
            <UserDropDown session={sessionData} />
          ) : (
            <Link href="api/auth/signin">Login</Link>
          )}
        </Flex>
      </nav>
    </header>
  );
};

export default Navbar;
