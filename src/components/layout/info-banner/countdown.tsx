// "use client";

import { useEffect, useState } from "react";
import { useContractRead } from "@starknet-react/core";
import { Text } from "@chakra-ui/react";
import { json } from "starknet";

import environment from "../../../../environment";

import compiledLotteryManagerContract from "@/assets/ABIs/Lottery_Manager_v0.1.sierra.json"; // (for contracts not in cairo-0, import the `.sierra.json` obtained when compiling the contract)
const lotteryManagerABI = compiledLotteryManagerContract.abi; // unlike cairo-0 contracts, for contracts written in latest cairo versions, the `.sierra.json` file does not need to be parsed to read the ABI

export default function Countdown() {
  // const initialTarget = new Date("October 23, 2023 18:00:00"); // TO BE DELETED

  const [nextTarget, setNextTarget] = useState(0);
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [timerStatus, setTimerStatus] = useState(true);

  const { data, isLoading } = useContractRead({
    // const { data, isLoading, error, refetch } = useContractRead({
    // is there a need to implement logic for error and/or refetch?
    address: environment.LotteryManagerAddress,
    abi: lotteryManagerABI,
    functionName: "get_next_draw_min_time",
    args: [],
    watch: false, // should I use `watch: true` instead?
  });

  useEffect(() => {
    if (data && !isLoading) {
      // console.log("data =", data); // => data = 1698076800n // TO BE DELETED
      // console.log("typeof data =", typeof data); // => typeof data = bigint // TO BE DELETED

      const dataNber = parseInt(data.toString());
      const data_in_ms = dataNber * 1000;

      // console.log("data_in_ms = ", data_in_ms); // data_in_ms = 1698076800000 // TO BE DELETED
      // console.log("typeof data_in_ms = ", typeof data_in_ms); // => typeof data_in_ms = number // TO BE DELETED

      setNextTarget(data_in_ms);
      // console.log("nextTarget = ", nextTarget); // nextTarget = 1698076800000 // TO BE DELETED

      //----------------------------------------------------------------
      // the content of this function will be executed every time after a certain interval of time, which is passed at the end of the function
      const interval = setInterval(() => {
        const now = new Date();
        const difference = nextTarget - now.getTime();

        if (difference >= 0) {
          // console.log("difference = ", difference); // TO BE DELETED

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
            setTimerStatus(!timerStatus);

            // // OPENING A MODAL WITH A BUTTON TO "Run the on-chain Lottery Draw"
            // // (displaying an animation while the lottery process is running would be cool)
            // // SETTING UP THE NEW COUNTDOWN TIMER
            // const newTarget: Date = new Date(nextTarget.getTime() + 604800000); // here 604800000 is the number of milliseconds within one week
            // const newTarget: Date = new Date(nextTarget.getTime() + 86400000); // here 86400000 is the number of milliseconds within a day
            // setNextTarget(newTarget);
          }
        }

        // end of the "interval" function
      }, 1000); // here "1000" means 1 second, so our timer will refresh every 1 second
      // }, 10000); // here "10000" means 10 seconds, so our timer will refresh every 10 seconds // TO BE DELETED
      //----------------------------------------------------------------
    }
  }, [data, isLoading, nextTarget, timerStatus]);

  if (isLoading || timerStatus === false)
    return (
      <Text fontSize="xs" color="white">
        Loading...
      </Text>
    );
  // if (error) return <span>Error: {JSON.stringify(error)}</span>;

  return (
    <Text fontSize="xs" color="white">
      next Lottery Draw in:
      {days} days, {hours} hours, {minutes} min, {seconds} sec.
    </Text>
  );
}
