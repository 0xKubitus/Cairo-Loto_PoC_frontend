// "use client";

import { useEffect, useState } from "react";
import { useContractRead } from "@starknet-react/core";
import { Text } from "@chakra-ui/react";
import { json } from "starknet";

import environment from "../../../../environment";
// import lotteryManagerABI from "@/assets/ABIs/abi_LotteryManager_v0.x.x.json"; // (syntax example to import ABI for contracts written in cairo-0)
import compiledLotteryManagerContract from "@/assets/ABIs/Lottery_Manager_v0.1.sierra.json"; // (for contracts not in cairo-0, import the `.sierra.json` obtained when compiling the contract)
// unlike cairo-0 contracts, for contracts written in latest cairo versions, the `.sierra.json` file does not need to be parsed to read the ABI
const lotteryManagerABI = compiledLotteryManagerContract.abi;

export default function Countdown() {
  const [days, setDays] = useState();
  const [hours, setHours] = useState();
  const [minutes, setMinutes] = useState();
  const [seconds, setSeconds] = useState();

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
      console.log("data =", data); // => data = 1698076800n
      console.log("typeof data =", typeof data); // => typeof data = bigint

      const dataNber = parseInt(data.toString());
      const data_in_ms = dataNber * 1000;

      console.log("data_in_ms = ", data_in_ms); // TO BE DELETED
      console.log("typeof data_in_ms = ", typeof data_in_ms); // TO BE DELETED
    }
  }, [data, isLoading]);

  // #################################
  // const now = new Date();
  // console.log("now = ", now); // => Mon Oct 16 2023 13:44:30 GMT+0200 (Central European Summer Time)
  // console.log("now.getTime() = ", now.getTime()); // => 1697456541612

  // const next_date = new Date("October 16, 2023 18:00:00");
  // console.log("parsed_next_date = ", Date.parse("October 16, 2023 18:00:00"));
  // #################################

  if (isLoading)
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

// ----------------------------------------------------------------

// /!\ WARNING /!\
// THERE IS AN ISSUE WITH THE CURRENT IMPLEMENTATION OF THE COUNTDOWN (below):

// Because I am relying on an 'initialTarget', the problem is that everytime a user arrives on the app, the default target is the 'initialTarget'...
// It will not be updated once a lottery draw has been performed!

// TODO => Find a way to compute the 'intialTarget' when a user arrives on the app.
// The initial target should be the nber of milliseconds between the moment the user arrives and the next lottery draw.

// So, for example:
// - If a lottery draw is due every week, I have to choose a specific day of the week and a specific time for each draw to occur.
// - If a lottery draw is due every day, I have to choose a specific time of the day for each draw to occur.

// ----------------------------------------------------------------

// "use client";

// import { useEffect, useState } from "react";
// import { Text } from "@chakra-ui/react";

// export default function Countdown() {
//   const [days, setDays] = useState(0);
//   const [hours, setHours] = useState(0);
//   const [minutes, setMinutes] = useState(0);
//   const [seconds, setSeconds] = useState(0);
// I am not sure that having "0" as the default value for these states is a good idea (because of the condition is the useEffect below)

//   const initialTarget = new Date("October 11, 2023 18:00:00");
//   const [nextTarget, setNextTarget] = useState(initialTarget);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       // the content of this function will be executed every time after a certain interval of time, which is passed at the end of the function

//       const now = new Date();
//       const difference = nextTarget.getTime() - now.getTime();

//       // rounding up the difference between current time and target time in days
//       // (skip exceeding hours, minutes and seconds) ->
//       const d = Math.floor(difference / (1000 * 60 * 60 * 24));
//       setDays(d);

//       // using modulo to get only the remainder of the difference in hours, then min. and sec. ->
//       const h = Math.floor(
//         (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
//       );
//       setHours(h);
//       const m = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
//       setMinutes(m);
//       const s = Math.floor((difference % (1000 * 60)) / 1000);
//       setSeconds(s);

//       // when countdown reaches zero, execute the following piece of code ->
//       if (d <= 0 && h <= 0 && m <= 0 && s <= 0) {
//         // setting up the next countdown
//         // const newTarget: Date = new Date(nextTarget.getTime() + 604800000); // here 604800000 is the number of milliseconds within one week
//         const newTarget: Date = new Date(nextTarget.getTime() + 86400000); // here 86400000 is the number of milliseconds within a day
//         setNextTarget(newTarget);

//         // opens a modal with a button to "Run the on-chain Lottery Draw"

//         // adding a modal displaying an animation while the lottery process is running would be cool
//       }

//       // end of the "interval" function
//     }, 1000); // here "1000" means 1 second, so our timer will refresh every second

//     return () => clearInterval(interval);
//   }, [nextTarget]);

//   return (
//     <Text fontSize="xs" color="white">
//       next Lottery Draw in: {days} days, {hours} hours, {minutes} min, {seconds}{" "}
//       sec.
//     </Text>
//   );
// }
