"use client";
import { Box, Button, Card, Flex, Heading } from "@radix-ui/themes";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";

const SignInPage = () => {
  const [providers, setProviders] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const setTheProviders = async () => {
      const res = await fetch("/api/auth/providers");
      const data = await res.json();
      setProviders(data);
    };
    setTheProviders();
  }, []);
  const handleSignIn = async (providerId: string) => {
    const result = await signIn(providerId, { redirect: false });

    if (result?.error) {
      alert(`Error signing in: ${result.error}`); // Template literal for consistency
      return; // Early exit if there's an error
    }

    // If there's no error, assume success
    router.push("/"); // Redirect on success
  };

  return (
    <Box p="4" maxWidth="500px" mx="auto">
      <Card size="3">
        <Heading size={{ initial: "8", xs: "9" }}>
          Sign In with your <span className="text-[#ffc53d]">Google</span>{" "}
          account
        </Heading>

        {providers &&
          Object.values(providers).map((provider: any) => (
            <div className="mt-6" key={provider.name}>
              <Flex justify="center">
                <Button
                  style={{ paddingLeft: 0 }}
                  size="4"
                  onClick={() => handleSignIn(provider.id)}
                >
                  <Flex
                    align="center"
                    justify="center"
                    className="bg-white h-[48px] w-[48px] rounded-l"
                  >
                    <FcGoogle size={25} />
                  </Flex>
                  Sign in with Google
                </Button>
              </Flex>
            </div>
          ))}
      </Card>
    </Box>
  );
};

export default SignInPage;
