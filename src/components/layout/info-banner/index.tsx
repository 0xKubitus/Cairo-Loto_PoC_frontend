import { Flex, Spacer, Text } from "@chakra-ui/react";
import { useContractRead } from "@starknet-react/core";
import { json } from "starknet";
import environment from "../../../../environment";
import ticketsHandlerABI from "@/assets/ABIs/abi_TicketsHandler_v0.4.4.json";
import { StringDecoder } from "string_decoder";

export default function InfoBanner() {
  const compiledTicketsHandlerContract = json.parse(
    JSON.stringify(ticketsHandlerABI)
  );

  const { data, refetch } = useContractRead({
    address: environment.ticketsHandlerAddress,
    abi: compiledTicketsHandlerContract,
    functionName: "totalSupply",
    args: [],
    watch: true,
  });

  console.log("data = ", data);
  const stringData = data.totalSupply.low.toString();
  console.log("stringData = ", stringData);

  if (!data) {
    return null; // Return null or loading state while data is being fetched
  }

  return (
    <div>
      <p>circ supply call successfull</p>
      <p>{stringData}</p>
    </div>
  );
}
