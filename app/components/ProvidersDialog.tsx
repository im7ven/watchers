import {
  Box,
  Button,
  Dialog,
  Flex,
  Heading,
  Select,
  Separator,
  Strong,
  Text,
} from "@radix-ui/themes";
import Image from "next/image";
import { useState } from "react";
import { FaPlay } from "react-icons/fa";
import { MediaDetail } from "../hooks/useMediaDetails";
import ProviderAlert from "./ProviderAlert";
Image;

type Props = {
  media: MediaDetail;
};

const logoPath = "https://image.tmdb.org/t/p/w200";

const ProvidersDialog = ({ media }: Props) => {
  const [providerCountry, setProviderCountry] = useState("CA");

  const streamProviders =
    media["watch/providers"].results[providerCountry]?.flatrate;
  const rentProviders = media["watch/providers"].results[providerCountry]?.rent;

  return (
    <Box mt="4">
      <Dialog.Root>
        <Dialog.Trigger>
          <Button className="items-center text-[#efc332] font-extrabold underline">
            <FaPlay size="15px" />
            Where to Watch
          </Button>
        </Dialog.Trigger>
        <Dialog.Content maxWidth="450px" aria-describedby={undefined}>
          <Flex mb="5" align="center" justify="between">
            <Dialog.Title trim="both" mb="0" size={{ initial: "5", sm: "6" }}>
              Providers
            </Dialog.Title>
            <Select.Root
              value={providerCountry}
              onValueChange={(value) => setProviderCountry(value)}
            >
              <Select.Trigger>
                Select Country - <Strong>{providerCountry}</Strong>
              </Select.Trigger>
              <Select.Content>
                <Select.Item value="CA">Canada</Select.Item>
                <Select.Item value="US">United States</Select.Item>
                <Select.Item value="GB">United Kingdom</Select.Item>
                <Select.Item value="DE">Germany</Select.Item>
                <Select.Item value="FR">France</Select.Item>
                <Select.Item value="IN">India</Select.Item>
                <Select.Item value="BR">Brazil</Select.Item>
              </Select.Content>
            </Select.Root>
          </Flex>

          <Heading size="2" className="uppercase">
            Stream:
          </Heading>
          <Flex mt="3" direction="column" gap="2">
            {streamProviders ? (
              streamProviders?.map((provider) => (
                <Flex align="center" gap="3" key={provider.provider_id}>
                  <Image
                    src={logoPath + provider.logo_path}
                    height={50}
                    width={50}
                    alt={provider.provider_name + "logo"}
                  />
                  <Text>{provider.provider_name}</Text>
                </Flex>
              ))
            ) : (
              <ProviderAlert watchMethod="streaming" />
            )}
          </Flex>
          <Separator my="3" size="4" />

          <Heading size="2" className="uppercase">
            Rent:
          </Heading>
          <Flex mt="3" direction="column" gap="2">
            {rentProviders ? (
              rentProviders?.map((provider) => (
                <Flex align="center" gap="3" key={provider.provider_id}>
                  <Image
                    src={logoPath + provider.logo_path}
                    height={50}
                    width={50}
                    alt={provider.provider_name + "logo"}
                  />
                  <Text>{provider.provider_name}</Text>
                </Flex>
              ))
            ) : (
              <ProviderAlert watchMethod="renting" />
            )}
          </Flex>
        </Dialog.Content>
      </Dialog.Root>
    </Box>
  );
};

export default ProvidersDialog;
