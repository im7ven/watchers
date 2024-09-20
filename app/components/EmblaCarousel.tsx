import React from "react";
import useEmblaCarousel from "embla-carousel-react";
import { EmblaOptionsType } from "embla-carousel";
import Image, { StaticImageData } from "next/image";
import { Box, Text } from "@radix-ui/themes";

type Slide = {
  id: number;
  name: string;
  character?: string;
  src?: StaticImageData | string;
  alt: string;
  posterPath?: string;
};

type Props = {
  slides: Slide[];
};

const EmblaCarousel = ({ slides }: Props) => {
  const [emblaRef] = useEmblaCarousel({ dragFree: true });

  // const source = {`${slide.posterPath ? slide.posterPath : ""}${slide.src}`}

  console.log();

  return (
    <section className="embla">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {slides.map((slide) => (
            <Box className="embla__slide" key={slide.id}>
              <Image
                src={slide.src!}
                alt={slide.alt}
                width={200}
                height={0}
                className="max-w-[110px] h-[165px]"
              />
              <Text weight="bold" align="center" size="1" as="p">
                {slide.name}
              </Text>
              <Text as="p" align="center" size="1">
                {slide.character}
              </Text>
            </Box>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EmblaCarousel;
