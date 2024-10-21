import {
  Avatar,
  Box,
  Button,
  DropdownMenu,
  Flex,
  Text,
} from "@radix-ui/themes";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import { IoMenu } from "react-icons/io5";

const Menu = () => {
  const { data: sessionData, status } = useSession();
  const [open, setOpen] = useState(false);

  return (
    <DropdownMenu.Root open={open} onOpenChange={setOpen}>
      <DropdownMenu.Trigger>
        <span>
          <IoMenu size="30" />
        </span>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        {status === "authenticated" && (
          <DropdownMenu.Item className="flex my-4 tex hover:bg-[#171918] hover:text-[rgba(255,255,255,0.9)]">
            <Avatar
              size="4"
              radius="full"
              src={sessionData?.user?.image!}
              fallback
              referrerPolicy="no-referrer"
            />
            <Flex direction="column">
              <Text size="4">{sessionData.user?.name}</Text>
              <Text>{sessionData.user?.email}</Text>
            </Flex>
          </DropdownMenu.Item>
        )}
        <DropdownMenu.Item>Watch List</DropdownMenu.Item>
        <DropdownMenu.Item>Reviews</DropdownMenu.Item>

        <DropdownMenu.Separator />
        <Link href="/genres">
          <DropdownMenu.Item onSelect={() => setOpen(false)}>
            Genres
          </DropdownMenu.Item>
        </Link>
        <DropdownMenu.Separator />
        <DropdownMenu.Item
          className="hover:bg-transparent"
          style={{ flexGrow: 1, justifyContent: "center", width: "100%" }}
        >
          {status === "unauthenticated" ? (
            <Link href="/api/auth/signin">
              <Button style={{ width: "100%" }}>Login</Button>
            </Link>
          ) : (
            <Link className="w-full" href="/api/auth/signout">
              <Button style={{ width: "100%" }}>Logout</Button>
            </Link>
          )}
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};

export default Menu;
