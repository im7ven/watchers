import { Callout } from "@radix-ui/themes";
import React from "react";
import { BsInfoCircleFill } from "react-icons/bs";

const ProviderAlert = ({ watchMethod }: { watchMethod: string }) => {
  return (
    <Callout.Root>
      <Callout.Icon>
        <BsInfoCircleFill />
      </Callout.Icon>
      <Callout.Text>
        Currently not available for {watchMethod} in your country
      </Callout.Text>
    </Callout.Root>
  );
};

export default ProviderAlert;
