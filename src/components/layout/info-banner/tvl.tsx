import { Text } from "@chakra-ui/react";

export default function TotalValueLocked({ data, isLoading, error }) {
  if (isLoading)
    return (
      <Text fontSize="xs" color="white">
        current TVL: Loading
      </Text>
    );

  if (error) {
    console.log("Error: ", JSON.stringify(error));
  }

  return (
    data && (
      <Text fontSize="xs" color="white">
        current TVL: {data.totalSupply.low.toString() * 10} USDC
      </Text>
    )
  );
}
