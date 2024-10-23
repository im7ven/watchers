import { Heading, Flex } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";
import { MdSettingsRemote } from "react-icons/md";

const Logo = () => {
  return (
    <Link href="/" className="flex items-center gap-2 md:mr-5">
      <Heading weight="medium">
        <Flex>
          <span className="text-[#ffc53d] font-bold hidden sm:inline">W</span>
          <span className="hidden sm:inline">atc</span>
          <span>
            <MdSettingsRemote
              className="inline-block -translate-y-1 -translate-x-1 rotate-45 sm:rotate-0"
              size={25}
              color="#ffc53d"
            />
          </span>
          <span className=" hidden sm:inline -translate-x-[10px]">ers</span>
        </Flex>
      </Heading>
    </Link>
  );
};

export default Logo;
