import { Flex, Button } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import React from "react";
import { IoReturnUpBackOutline } from "react-icons/io5";

const BackButton = () => {
  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };

  return (
    <Button
      mb="4"
      variant="ghost"
      color="gray"
      style={{ color: "white" }}
      className="text-white"
      onClick={handleGoBack}
    >
      <IoReturnUpBackOutline size="25" />
      Go Back
    </Button>
  );
};

export default BackButton;
