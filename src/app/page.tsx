"use client"; // needed for components using "useState" hook
// (so here, the <Countdown /> component)

import { useEffect, useState } from "react";

import { Flex, Heading, Text } from "@chakra-ui/react";

const HomePage = () => {
  return (
    <Flex height="100vh" alignItems="center" justifyContent="center">
      <Flex direction="column" background="gray.100" p={12} rounded={6}>
        <Heading mb="2">Countdown to next Lottery Draw</Heading>
        <Countdown />
      </Flex>
    </Flex>
  );
};

export default HomePage;

function Countdown() {
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  const initialTarget = new Date("October 11, 2023 17:53:00");
  const [nextTarget, setNextTarget] = useState(initialTarget);

  useEffect(() => {
    const interval = setInterval(() => {
      // the content of this function will be executed every time after a certain interval of time, which is passed at the end of the function

      const now = new Date();
      const difference = nextTarget.getTime() - now.getTime();

      // rounding up the difference between current time and target time in days
      // (skip exceeding hours, minutes and seconds) ->
      const d = Math.floor(difference / (1000 * 60 * 60 * 24));
      setDays(d);

      // using modulo to get only the remainder of the difference in hours, then min. and sec. ->
      const h = Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      setHours(h);
      const m = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      setMinutes(m);
      const s = Math.floor((difference % (1000 * 60)) / 1000);
      setSeconds(s);

      if (d <= 0 && h <= 0 && m <= 0 && s <= 0) {
        const newTarget: Date = new Date(nextTarget.getTime() + 604800000);
        setNextTarget(newTarget);
      }

      // end of the "interval" function
    }, 1000); // here "1000" means 1 second, so our timer will refresh every second

    return () => clearInterval(interval);
  }, [nextTarget]);

  return (
    <Text fontSize="xl" align="center" color="red" as="b">
      {days} days, {hours} hours, {minutes} min, {seconds} sec.
    </Text>
  );
}
