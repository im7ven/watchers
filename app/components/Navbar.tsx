"use client";
import { Button, Flex, TextField } from "@radix-ui/themes";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { BsSearch } from "react-icons/bs";
import UserDropDown from "./UserDropDown";
import React, { useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useSearchValue } from "../contexts/SearchContext";

const Navbar = () => {
  const { data: sessionData, status } = useSession();
  const router = useRouter();
  const currentPath = usePathname();
  const { searchVal, setSearchVal } = useSearchValue();
  const searchRef = useRef<HTMLInputElement>(null);

  console.log(router);
  console.log("current", currentPath);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (searchRef.current) {
      setSearchVal(searchRef.current.value);
    }
    if (currentPath !== "search") {
      router.push("/search");
    }
  };

  console.log(searchVal);

  return (
    <header className="border-b border-[rgba(255,255,255,.2)] py-3 px-3">
      <nav>
        <Flex justify="between" align="center" gap="5">
          <Link href="/">LOGO</Link>
          <form onSubmit={handleSubmit}>
            <TextField.Root
              ref={searchRef}
              className="w-full"
              placeholder="Search the docs…"
            >
              <TextField.Slot>
                <BsSearch />
              </TextField.Slot>
            </TextField.Root>
          </form>
          {status === "authenticated" ? (
            <UserDropDown session={sessionData} />
          ) : (
            <Link href="api/auth/signin">
              <Button>Login</Button>
            </Link>
          )}
        </Flex>
      </nav>
    </header>
  );
};

export default Navbar;
