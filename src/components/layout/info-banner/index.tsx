import { Flex, Spacer, Text } from "@chakra-ui/react";
import { useContractRead } from "@starknet-react/core";
import { json } from "starknet";

import environment from "../../../../environment";
import ticketsHandlerABI from "@/assets/ABIs/abi_TicketsHandler_v0.4.4.json";
import CircSupply from "./circulating-supply";
import TotalValueLocked from "./tvl";

export default function InfoBanner() {
  const compiledTicketsHandlerContract = json.parse(
    JSON.stringify(ticketsHandlerABI)
  );

  const { data, isLoading, error, refetch } = useContractRead({
    address: environment.ticketsHandlerAddress,
    abi: compiledTicketsHandlerContract,
    functionName: "totalSupply",
    args: [],
    watch: true,
  });

  return (
    <Flex h="3vh" bg="blue.900" px="3" alignItems="center">
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

      <CircSupply data={data} isLoading={isLoading} error={error} />

      <Spacer />

      <TotalValueLocked data={data} isLoading={isLoading} error={error} />
    </Flex>
  );
}
