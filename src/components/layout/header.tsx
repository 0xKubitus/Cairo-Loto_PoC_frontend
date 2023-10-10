// "use client";

import { Flex, Spacer, Text } from "@chakra-ui/react";

export default function Header() {
  return (
    <Flex h="3vh" bg="blue.900" px="3" alignItems="center">
      <Text fontSize="xs" color="white">
        Nber of Tickets in circulation: XX,XXX CAIRO LOTO Tickets
      </Text>

      <Spacer />

      <Text fontSize="xs" color="white">
        next Lottery Draw in:
        {/* INSERT WEEKLY COUNTDOWN HERE */}
        XX d. XX h. XX m.
      </Text>

      <Spacer />

      <Text fontSize="xs" color="white">
        Cashprize current value: XXX USDC
      </Text>

      <Spacer />

      <Text fontSize="xs" color="white">
        current TVL: XXX,XXX USDC
      </Text>
    </Flex>
  );
}
