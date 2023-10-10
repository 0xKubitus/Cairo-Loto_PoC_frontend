"use client";

import { useState, useEffect } from "react";
import { Flex, Spacer, Text } from "@chakra-ui/react";
import { useContractRead } from "@starknet-react/core";
import { json } from "starknet";

import environment from "environment.ts";
import ticketsHandlerABI from "@/assets/ABIs/abi_TicketsHandler_v0.4.4.json"; // make sure to import the latest TicketsHandler version's abi

export default function InfoBanner() {
  const compiledTicketsHandlerContract = json.parse(
    JSON.stringify(ticketsHandlerABI)
  );

  // const circulatingTickets
  // const [circulatingTickets, setCirculatingTickets] = useState(0);

  const {
    data: circulatingTickets,
    // isLoading,
    // error,
    refetch,
  } = useContractRead({
    address: environment.ticketsHandlerAddress,
    abi: compiledTicketsHandlerContract,
    functionName: "totalSupply",
    args: [],
    watch: true,
  });

  // if (isLoading) return <span>Loading...</span>;
  // if (error) return <span>Error: {JSON.stringify(error)}</span>;

  return (
    <Flex h="3vh" bg="blue.900" px="3" alignItems="center">
      <Text fontSize="xs" color="white">
        Nber of Tickets in circulation: {circulatingTickets} CAIRO LOTO Tickets
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
