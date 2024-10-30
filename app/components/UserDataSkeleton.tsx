import { Box, Flex, Skeleton } from "@radix-ui/themes";
import React from "react";

const UserDataSkeleton = () => {
  return (
    <Box p="4" className="space-y-3">
      <Flex gap="3">
        <Skeleton
          width={{ initial: "100px", sm: "150px" }}
          height={{ initial: "150px", sm: "225px" }}
        />
        <Box className="space-y-2 flex-grow ">
          <Skeleton
            width={{ initial: "120px", sm: "200px" }}
            height={{ initial: "35px", sm: "45px" }}
          />
          <Skeleton
            width={{ initial: "100%", xs: "80%" }}
            height={{ initial: "100px", sm: "150px" }}
          />
        </Box>
      </Flex>
      <Flex gap="3">
        <Skeleton
          width={{ initial: "100px", sm: "150px" }}
          height={{ initial: "150px", sm: "225px" }}
        />
        <Box className="space-y-2 flex-grow ">
          <Skeleton
            width={{ initial: "120px", sm: "200px" }}
            height={{ initial: "35px", sm: "45px" }}
          />
          <Skeleton
            width={{ initial: "100%", xs: "80%" }}
            height={{ initial: "100px", sm: "150px" }}
          />
        </Box>
      </Flex>
      <Flex gap="3">
        <Skeleton
          width={{ initial: "100px", sm: "150px" }}
          height={{ initial: "150px", sm: "225px" }}
        />
        <Box className="space-y-2 flex-grow ">
          <Skeleton
            width={{ initial: "120px", sm: "200px" }}
            height={{ initial: "35px", sm: "45px" }}
          />
          <Skeleton
            width={{ initial: "100%", xs: "80%" }}
            height={{ initial: "100px", sm: "150px" }}
          />
        </Box>
      </Flex>
      <Flex gap="3">
        <Skeleton
          width={{ initial: "100px", sm: "150px" }}
          height={{ initial: "150px", sm: "225px" }}
        />
        <Box className="space-y-2 flex-grow ">
          <Skeleton
            width={{ initial: "120px", sm: "200px" }}
            height={{ initial: "35px", sm: "45px" }}
          />
          <Skeleton
            width={{ initial: "100%", xs: "80%" }}
            height={{ initial: "100px", sm: "150px" }}
          />
        </Box>
      </Flex>
    </Box>
  );
};

export default UserDataSkeleton;
