import React from "react";

type Props = {
  videoId: string;
  site: string;
};

const VideoPlayer = ({ videoId, site }: Props) => {
  return (
    <iframe
      className="mx-auto my-8"
      src={`https://${site}.com/embed/${videoId}`}
    >
      VideoPlayer
    </iframe>
  );
};

export default VideoPlayer;
