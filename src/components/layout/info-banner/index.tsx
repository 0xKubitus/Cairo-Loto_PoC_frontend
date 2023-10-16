import { useEffect } from "react";
import { Flex, Spacer, Text } from "@chakra-ui/react";
import { useContractRead } from "@starknet-react/core";
import { json } from "starknet";

import environment from "../../../../environment";
import ticketsHandlerABI from "@/assets/ABIs/abi_TicketsHandler_v0.4.4.json";
import CircSupply from "./circulating-supply";
import TotalValueLocked from "./tvl";
import Countdown from "./countdown";

const compiledTicketsHandlerContract = json.parse(
  JSON.stringify(ticketsHandlerABI)
);

export default function InfoBanner() {
  const { data, isLoading, error } = useContractRead({
    address: environment.ticketsHandlerAddress,
    abi: compiledTicketsHandlerContract,
    functionName: "totalSupply",
    args: [],
    watch: false,
    // "watch: true" allows to refresh the data at each new block...
    // but it looks like the call is being made every 5-10seconds anyways (I noticed that as soon as I'm using the useContractRead() hook from Starknet React, the infoBanner components gets refreshed every 5-10 seconds)
  });

  // TODO => I need to check if the data actually gets re-rendered or if I need to implement a useEffect
  // or something else so that the new data displayed every time a new block is added to the chain!

  if (data) {
    return (
      <Flex h="3vh" bg="blue.900" px="3" alignItems="center">
        <Countdown />

        <Spacer />

        {/* TO BE REPLACED BY A COMPONENT ONCE I FIND THE RIGHT WAY TO GET THIS VALUE */}
        <Text fontSize="xs" color="white">
          Cashprize current value: XXX USDC
        </Text>

        {/* JE N'AFFICHE PAS LES COMPOSANTS CI-DESSOUS POUR LE MOMENT CAR SINON ÇA RE-RENDER TOUTES LES 5sec. ET ÇA REND IMPOSSIBLE DE LIRE LA CONSOLE DU BROWSER */}
        {/* (JE CROIS QU'IL FAUT UTILISER DES "USE EFFECT" DANS LES COMPOSANTS -> cf. composant "Countdown") */}
        {/* <Spacer />

        <CircSupply data={data} isLoading={isLoading} error={error} />

        <Spacer />

        <TotalValueLocked data={data} isLoading={isLoading} error={error} /> */}
      </Flex>
    );
  }
}
