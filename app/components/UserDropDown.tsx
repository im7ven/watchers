import { Avatar, Button, DropdownMenu } from "@radix-ui/themes";
import { Session } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {
  session?: Session;
};

const UserDropDown = ({ session }: Props) => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <Avatar radius="full" src={session?.user?.image!} fallback />
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        <DropdownMenu.Item>{session?.user?.name}</DropdownMenu.Item>
        <DropdownMenu.Item>
          <Link href="/api/auth/signout">Logout</Link>
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};

export default UserDropDown;
