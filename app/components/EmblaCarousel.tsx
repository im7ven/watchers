import { Box, Text } from "@radix-ui/themes";
import useEmblaCarousel from "embla-carousel-react";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";

type Slide = {
  id: number;
  name: string;
  character?: string;
  src?: StaticImageData | string;
  alt: string;
  posterPath?: string;
  media_type: string;
};

type Props = {
  slides: Slide[];
};

const EmblaCarousel = ({ slides }: Props) => {
  const [emblaRef] = useEmblaCarousel({ dragFree: true });

  return (
    <section className="embla">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {slides.map((slide, index) => (
            <Link
              href={`/${slide.media_type}/${slide.id}`}
              className="embla__slide"
              key={index}
            >
              <Box>
                <Image
                  unoptimized
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
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EmblaCarousel;
