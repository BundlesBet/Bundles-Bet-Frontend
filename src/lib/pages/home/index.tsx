import { Flex } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { NextSeo } from "next-seo";
import { useEffect } from "react";
import { useAccount } from "wagmi";

import CTASection from "lib/components/samples/CTASection";
import SomeText from "lib/components/samples/SomeText";

const Home = () => {
  const { address, isConnected } = useAccount();
  const router = useRouter();

  useEffect(() => {
    if (isConnected && address) {
      router.push("/explore");
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isConnected, address]);

  return (
    <Flex
      direction="column"
      alignItems="center"
      justifyContent="center"
      minHeight="80vh"
      gap={4}
      mb={8}
      w="full"
    >
      <NextSeo title="Home" />
      <SomeText />
      <CTASection />
    </Flex>
  );
};

export default Home;
