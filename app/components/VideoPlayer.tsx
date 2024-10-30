import React from "react";

type Props = {
  videoId: string;
  site: string;
};

const VideoPlayer = ({ videoId, site }: Props) => {
  return (
    <iframe
      allowFullScreen
      className="mx-auto my-8 aspect-video w-full max-w-[500px]"
      src={`https://${site}.com/embed/${videoId}`}
    >
      VideoPlayer
    </iframe>
  );
};

export default VideoPlayer;
