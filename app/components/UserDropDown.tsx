import { Avatar, DropdownMenu } from "@radix-ui/themes";
import { Session } from "next-auth";
import Link from "next/link";

type Props = {
  session?: Session;
};

const UserDropDown = ({ session }: Props) => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <span>
          <Avatar
            radius="full"
            src={session?.user?.image!}
            fallback
            referrerPolicy="no-referrer"
          />
        </span>
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
