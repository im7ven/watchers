import { Button, DropdownMenu, Text } from "@radix-ui/themes";
import React from "react";
import { BsBookmarkPlusFill } from "react-icons/bs";
import { SlOptionsVertical } from "react-icons/sl";
import { MdRateReview } from "react-icons/md";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { error } from "console";

type Media = {
  mediaId: number;
  mediaTitle: string;
  mediaPoster: string;
  mediaType: string;
  mediaRuntime: number;
  mediaRating: number;
  mediaRelease: string;
};

const MediaOptions = ({ ...media }: Media) => {
  const queryClient = useQueryClient();

  const addToWatchlist = useMutation<Media, Error, Media>({
    mutationFn: async (media: Media) => {
      try {
        const { data } = await axios.post("/api/watchlist", media);
        return data;
      } catch (error) {
        throw new Error(
          "Unexpected error occurred while attempting to retrieve watch lists."
        );
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["watchlist"] });
    },
  });

  const handleAddToWatchlist = () => {
    addToWatchlist.mutate({
      ...media,
    });
  };

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <span>
          <SlOptionsVertical size="25" />
        </span>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        <DropdownMenu.Item onClick={handleAddToWatchlist}>
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
