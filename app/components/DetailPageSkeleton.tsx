import { Skeleton, Box, Flex } from "@radix-ui/themes";
import React from "react";

const DetailPageSkeleton = () => {
  return (
    <Box p="4">
      <Flex gap="3">
        <Skeleton
          width={{ initial: "100px", sm: "150px" }}
          height={{ initial: "150px", sm: "225px" }}
        />
        <Box className="space-y-2">
          <Skeleton
            width={{ initial: "120px", xs: "200px" }}
            height={{ initial: "35px", xs: "45px" }}
          />
          <Skeleton
            width={{ initial: "170px", xs: "300px" }}
            height={{ initial: "35px", xs: "45px" }}
          />
        </Box>
      </Flex>
      <Skeleton mt="4" height={"200px"} />
      <Skeleton mt="4" height={"150px"} />
    </Box>
  );
};

export default DetailPageSkeleton;
