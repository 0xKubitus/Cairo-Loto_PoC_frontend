import { useEffect, useState } from "react";
import { Text } from "@chakra-ui/react";

export default function Countdown() {
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const target = new Date("10/11/2023 03:00:00");

    const interval = setInterval(() => {
      const now = new Date();
      const difference = target.getTime() - now.getTime();

      // rounding up the difference between current time and target time in days ->
      const d = Math.floor(difference / (1000 * 60 * 60 * 24));
      setDays(d);

      // using modulo to get only the remainder of the difference ->
      const h = Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      setHours(h);
      const m = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      setMinutes(m);
      const s = Math.floor((difference % (1000 * 60)) / 1000);
      setSeconds(s);
    }, 1000); // here "1000" means 1 second, so our timer will refresh every second

    return () => clearInterval(interval);
  }, []);

  return (
    <Text fontSize="xs" color="white">
      next Lottery Draw in: {days} days, {hours} hours, {minutes} min, {seconds}{" "}
      sec.
    </Text>
  );
}
