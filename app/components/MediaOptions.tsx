import { Button, DropdownMenu, Flex } from "@radix-ui/themes";
import React from "react";
import { BsBookmarkPlusFill } from "react-icons/bs";
import { SlOptionsVertical } from "react-icons/sl";

import { MdRateReview } from "react-icons/md";

const MediaOptions = () => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <span>
          <SlOptionsVertical size="25" />
        </span>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        <DropdownMenu.Item>
          <BsBookmarkPlusFill size="20" />
          Add to watch list
        </DropdownMenu.Item>
        <DropdownMenu.Item>
          <MdRateReview size="20" />
          Add review
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};

export default MediaOptions;
