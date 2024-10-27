"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import posterPlaceholder from "@/public/movie_placeholder.png";
import { Box, Button, Flex, Heading, Spinner, Text } from "@radix-ui/themes";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { FaRegStar } from "react-icons/fa";
import { TbPointFilled } from "react-icons/tb";
import PlaceholderAlert from "../components/PlaceholderAlert";
import { IoMdRemoveCircleOutline } from "react-icons/io";
import { MdOutlineDelete } from "react-icons/md";
import React from "react";

type WatchListMedia = {
  mediaId: number;
  mediaType: number;
  mediaPoster: string;
  mediaTitle: string;
  mediaRating: number;
  mediaRuntime: string;
  mediaRelease: string;
};

const posterUrl = `https://image.tmdb.org/t/p/w500`;

const UserWatchListPage = () => {
  const queryClient = useQueryClient();

  const { data: media, isLoading } = useQuery({
    queryKey: ["watchlist"],
    queryFn: async () => {
      try {
        const { data } = await axios.get<WatchListMedia[]>("/api/watchlist");
        return data;
      } catch (error) {
        throw new Error("There was an error retrieving the watch list");
      }
    },
  });

  const deleteWatchlistItem = useMutation({
    mutationFn: async (mediaId: { mediaId: number }) => {
      await axios.delete("/api/watchlist", { data: mediaId });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["watchlist"] });
    },
    onError: () => {
      console.log("There was an error trying to delete the media item");
    },
  });

  const handleDeleteItem = (mediaId: { mediaId: number }) => {
    deleteWatchlistItem.mutate(mediaId);
  };

  if (isLoading) {
    return <Spinner />;
  }

  if (media && media.length < 1) {
    return (
      <PlaceholderAlert
        marginTop="4"
        message="You currently have no items in your watchlist"
      />
    );
  }

  return (
    <Box p="4" className="space-y-2">
      {media?.map((item) => (
        <Flex align="start" gap="3" key={item.mediaId}>
          <Link href={`/${item.mediaType}/${item.mediaId}`}>
            <Box width={{ initial: "100px", sm: "150px" }}>
              <Image
                src={
                  item.mediaPoster
                    ? posterUrl + item.mediaPoster
                    : posterPlaceholder
                }
                alt={`${item.mediaTitle} poster`}
                className="w-[100px] md:w-[150px] h-auto "
                width={100}
                height={150}
              />
            </Box>
          </Link>

          <Box width="100%">
            <Flex justify="between" align="center">
              <Heading weight="medium" as="h2" size="4">
                {item.mediaTitle}
              </Heading>
              <span onClick={() => handleDeleteItem({ mediaId: item.mediaId })}>
                <MdOutlineDelete size={25} color="#DC6E6E" />
              </span>
            </Flex>
            <Flex className="mt-2" align="center" gap="1">
              <FaRegStar size={20} color="#ffcd53" />
              <Text as="p">{item.mediaRating.toFixed(1)}</Text>
              <TbPointFilled />
              <Text as="p">{item.mediaRuntime} min</Text>
              <TbPointFilled />
              <Text>{item?.mediaRelease.slice(0, 4)}</Text>
            </Flex>
          </Box>
        </Flex>
      ))}
    </Box>
  );
};

export default UserWatchListPage;
