import { Flex, Spacer, Text } from "@chakra-ui/react";
import { useContractRead } from "@starknet-react/core";
import { json } from "starknet";

import environment from "../../../../environment";
import ticketsHandlerABI from "@/assets/ABIs/abi_TicketsHandler_v0.4.4.json";
import CircSupplyData from "./circulating-supply";

export default function InfoBanner() {
  return (
    <Flex h="3vh" bg="blue.900" px="3" alignItems="center">
      <CircSupplyData />

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
