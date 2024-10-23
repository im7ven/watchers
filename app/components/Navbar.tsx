"use client";
import { Flex, Text, TextField } from "@radix-ui/themes";
import { usePathname, useRouter } from "next/navigation";
import React, { useRef, useState } from "react";
import { BsSearch } from "react-icons/bs";
import { useSearchValue } from "../contexts/SearchContext";
import Menu from "./Menu";
import Logo from "./Logo";

const Navbar = () => {
  const router = useRouter();
  const currentPath = usePathname();
  const { searchVal, setSearchVal } = useSearchValue();
  const searchRef = useRef<HTMLInputElement>(null);
  const [isInvalid, setIsInvalid] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (searchRef.current) {
      if (searchRef.current.value.trim() === "") {
        setIsInvalid(true);
        return;
      }
      setSearchVal(searchRef.current.value);
      setIsInvalid(false);
      searchRef.current.value = "";
    }
    if (currentPath !== "search") {
      router.push("/search");
    }
  };

  const handleResetValidation = () => {
    setIsInvalid(false);
  };

  const handleInputChange = () => {
    if (isInvalid && searchRef.current?.value.trim() !== "") {
      setIsInvalid(false);
    }
  };

  return (
    <header className="border-b border-[rgba(255,255,255,.2)] py-3 px-3 lg:px-0">
      <nav>
        <Flex justify="between" align="center" gap={{ initial: "2", md: "3" }}>
          <Logo />
          <form onSubmit={handleSubmit}>
            <TextField.Root
              onBlur={handleResetValidation}
              onChange={handleInputChange}
              ref={searchRef}
              className={"w-full"}
              placeholder="Search the docs…"
            >
              <TextField.Slot>
                <BsSearch />
              </TextField.Slot>
            </TextField.Root>
            {isInvalid && <Text color="red">Please provide a value</Text>}
          </form>
          <Menu />
        </Flex>
      </nav>
    </header>
  );
};

export default Navbar;
