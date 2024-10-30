"use client";
import { Box } from "@radix-ui/themes";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import GoogleButton from "react-google-button";

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
    <Box
      maxWidth="500px"
      mx="auto"
      className="border-[2px] border-[#ffc53d] rounded"
    >
      <h1>Sign In</h1>
      {providers &&
        Object.values(providers).map((provider: any) => (
          <div key={provider.name}>
            <GoogleButton
              className="mx-auto"
              onClick={() => handleSignIn(provider.id)}
            />
          </div>
        ))}
    </Box>
  );
};

export default SignInPage;
