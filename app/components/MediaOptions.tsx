import { DropdownMenu } from "@radix-ui/themes";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { BsBookmarkPlusFill } from "react-icons/bs";
import { MdRateReview } from "react-icons/md";
import { SlOptionsVertical } from "react-icons/sl";
import { useToast } from "../contexts/ToastContext";

type Media = {
  mediaId: string;
  mediaTitle: string;
  mediaPoster: string;
  mediaType: string;
  mediaRuntime?: number;
  mediaRating: number;
  mediaRelease: string;
  mediaSeasons?: number;
};

const MediaOptions = ({ ...media }: Media) => {
  const queryClient = useQueryClient();
  const { setShowToast } = useToast();

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
      setShowToast(true);
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
