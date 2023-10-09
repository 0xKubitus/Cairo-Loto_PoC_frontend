"use client";

import { useAccount } from "@starknet-react/core";
import { Link } from "@chakra-ui/next-js";
import { Flex, Text } from "@chakra-ui/react";

import ConnectWalletBtn from "@/components/wallet/connect-btn";

export default function Navbar() {
  const { account, address, status } = useAccount();

  return (
    <Flex h="4vh" minW="full" align="center" justify="space-between">
      <Link href="/" size="lg">
        <Text fontSize="3xl" as="b" color="blue.700">
          Cairo Loto
        </Text>
      </Link>

      <Link
        href="/about"
        color="red.400"
        _hover={{
          fontWeight: "semibold",
          color: "red.500",
          textDecoration: "underline",
        }}
      >
        Documentation
      </Link>

      {status === "connected" && (
        <Link
          href="/about"
          color="red.400"
          _hover={{
            fontWeight: "semibold",
            color: "red.500",
            textDecoration: "underline",
          }}
        >
          Dashboard
        </Link>
      )}

      <ConnectWalletBtn />
    </Flex>
  );
}
