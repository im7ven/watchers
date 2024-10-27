import React from "react";
import { Text } from "@radix-ui/themes";

const PlaceholderMessage = ({ message }: { message: string }) => {
  return (
    <Text as="p" weight={"bold"} color="amber" align="center">
      {message}
    </Text>
  );
};

export default PlaceholderMessage;
