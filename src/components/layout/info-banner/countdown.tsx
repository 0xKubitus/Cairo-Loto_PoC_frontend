import { useState } from "react";
import { Text } from "@chakra-ui/react";

export default function Countdown() {
  const timerData = "XX d. XX h. XX m.";

  return (
    <Text fontSize="xs" color="white">
      next Lottery Draw in: {timerData}
    </Text>
  );
}
