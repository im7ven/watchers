import { DropdownMenu } from "@radix-ui/themes";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { usePathname, useRouter } from "next/navigation";
import { BsBookmarkPlusFill } from "react-icons/bs";
import { SlOptionsVertical } from "react-icons/sl";
import { useToast } from "../contexts/ToastContext";
import ReviewModal from "./ReviewModal";
import { useSession } from "next-auth/react";

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
  const { status } = useSession();
  const router = useRouter();

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
    if (status !== "authenticated") {
      router.push("/auth/signin");
    }
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
        <DropdownMenu.Item asChild>
          <ReviewModal
            reviewId={media.mediaId}
            reviewPoster={media.mediaPoster}
            reviewTitle={media.mediaTitle}
          />
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};

export default MediaOptions;
