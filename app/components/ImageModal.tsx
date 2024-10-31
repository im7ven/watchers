import { Dialog, VisuallyHidden } from "@radix-ui/themes";
import Image, { StaticImageData } from "next/image";

type Props = {
  imgSrc: StaticImageData | string;
  alt: string;
};

const ImageModal = ({ imgSrc, alt }: Props) => {
  if (typeof imgSrc !== "string") {
    return (
      <Image
        unoptimized
        className="rounded md:w-[150px] h-auto"
        width={100}
        height={100}
        src={imgSrc}
        alt={alt}
      />
    );
  }

  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <Image
          unoptimized
          className=" w-[100px] md:w-[150px] h-auto "
          width={100}
          height={150}
          src={imgSrc}
          alt={alt}
        />
      </Dialog.Trigger>
      <VisuallyHidden>
        <Dialog.Title>{`${alt} image`}</Dialog.Title>
      </VisuallyHidden>
      <Dialog.Description aria-describedby={`Enlarged ${alt} cover`} />
      <Dialog.Content maxWidth="450px">
        <Image
          unoptimized
          width={400}
          height={400}
          className="h-auto"
          src={imgSrc}
          alt={alt}
        />
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default ImageModal;
