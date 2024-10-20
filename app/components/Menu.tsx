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
import { IoMenu } from "react-icons/io5";

const Menu = () => {
  const { data: sessionData, status } = useSession();

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <span>
          <IoMenu size="30" />
        </span>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        {status === "authenticated" && (
          <DropdownMenu.Item className="flex my-4">
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
        <DropdownMenu.Item>Genres</DropdownMenu.Item>
        <DropdownMenu.Separator />
        <DropdownMenu.Item
          className="flex-1 flex-grow items-center"
          style={{ flexGrow: 1, justifyContent: "center", width: "100%" }}
        >
          {status === "unauthenticated" ? (
            <Button style={{ flexGrow: 1 }}>
              <Link href="/api/auth/signin">Login</Link>
            </Button>
          ) : (
            <Button style={{ flexGrow: 1 }}>
              <Link href="/api/auth/signout">Logout</Link>
            </Button>
          )}
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};

export default Menu;
