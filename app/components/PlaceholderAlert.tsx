import { Callout } from "@radix-ui/themes";
import { BsInfoCircleFill } from "react-icons/bs";

type Props = {
  marginTop?: string;
  message: string;
};

const PlaceholderAlert = ({ message, marginTop }: Props) => {
  return (
    <Callout.Root mt={marginTop} variant="outline">
      <Callout.Icon>
        <BsInfoCircleFill />
      </Callout.Icon>
      <Callout.Text weight="medium" size="3">
        {message}
      </Callout.Text>
    </Callout.Root>
  );
};

export default PlaceholderAlert;
