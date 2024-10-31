import { Box, Container, Grid, Skeleton } from "@radix-ui/themes";

const skeletonCount = Array.from({ length: 24 }, (_, index) => index);

const GridSkeleton = () => {
  return (
    <Box mt="2">
      <Skeleton height="30px" />
      <Container>
        <Grid
          columns={{ initial: "3", xs: "5", sm: "6" }}
          gap={{ initial: "2", md: "3" }}
          mt="2"
          mx="auto"
        >
          {skeletonCount.map((_, index) => (
            <Skeleton
              key={index}
              maxWidth="155px"
              height={{ initial: "150px", md: "200px" }}
            />
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default GridSkeleton;
