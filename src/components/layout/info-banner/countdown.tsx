// "use client";

import { useEffect, useState } from "react";
import { Text } from "@chakra-ui/react";

export default function Countdown() {
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  const initialTarget = new Date("October 11, 2023 18:00:00");
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

      // when countdown reaches zero, execute the following piece of code ->
      if (d <= 0 && h <= 0 && m <= 0 && s <= 0) {
        // setting up the next countdown
        // const newTarget: Date = new Date(nextTarget.getTime() + 604800000); // here 604800000 is the number of milliseconds within one week
        const newTarget: Date = new Date(nextTarget.getTime() + 86400000); // here 86400000 is the number of milliseconds within a day
        setNextTarget(newTarget);

        // opens a modal with a button to "Run the on-chain Lottery Draw"

        // adding a modal displaying an animation while the lottery process is running would be cool
      }

      // end of the "interval" function
    }, 1000); // here "1000" means 1 second, so our timer will refresh every second

    return () => clearInterval(interval);
  }, [nextTarget]);

  return (
    <Text fontSize="xs" color="white">
      next Lottery Draw in: {days} days, {hours} hours, {minutes} min, {seconds}{" "}
      sec.
    </Text>
  );
}
