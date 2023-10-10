import { Text } from "@chakra-ui/react";
import { useContractRead } from "@starknet-react/core";
import { json } from "starknet";

import environment from "../../../../environment";
import ticketsHandlerABI from "@/assets/ABIs/abi_TicketsHandler_v0.4.4.json";

export default function CircSupplyData() {
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

  if (isLoading) return <span>Loading...</span>;
  if (error) {
    console.log("Error: ", JSON.stringify(error));
  }

  return (
    data && (
      <Text fontSize="xs" color="white">
        Circulating Supply: {data.totalSupply.low.toString()} tickets
      </Text>
    )
  );
}
