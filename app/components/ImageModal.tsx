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
        className="rounded md:w-[150px]"
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
          className="rounded md:w-[150px]"
          width={120}
          height={100}
          src={imgSrc}
          alt={alt}
        />
      </Dialog.Trigger>
      <VisuallyHidden>
        <Dialog.Title>{`${alt} image`}</Dialog.Title>
      </VisuallyHidden>
      <Dialog.Description aria-describedby={`Enlarged ${alt} cover`} />
      <Dialog.Content maxWidth="450px">
        <Image width={400} height={400} src={imgSrc} alt={alt} />
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default ImageModal;
