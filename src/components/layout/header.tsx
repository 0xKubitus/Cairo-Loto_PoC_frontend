"use client";

import { Link } from "@chakra-ui/next-js";
import { Heading, Button, Flex, Text } from "@chakra-ui/react";

import ConnectButton from "@/lib/wallet/components/connect-button";

export default function Header() {
  return (
    <Flex
      align="center"
      justify="space-between"
      px={4}
      py={1}
      borderBottom="1px solid"
      borderColor="grey.900"
    >
      {/* <Heading size="lg">Cairo Loto</Heading> */}
      <Link href="/" size="lg">
        <Text fontSize="3xl" as="b" color="blue.700">
          Cairo Loto
        </Text>
      </Link>

      <Link
        href="/about"
        color="red.400"
        _hover={{ color: "red.500", textDecoration: "underline" }}
      >
        Documentation
      </Link>

      <Link
        href="/about"
        color="red.400"
        _hover={{ color: "red.500", textDecoration: "underline" }}
      >
        Dashboard
      </Link>

      <Text fontSize="xs">my Tickets Balance = XX Tickets</Text>

      {/* BUTTON TO BE REPLACED BY COMPONENT "<ConnectWalletBtn />" */}
      <Button colorScheme="orange" size="xs">
        Connect Wallet
      </Button>
    </Flex>
  );
}
