import React, { useState, useEffect } from "react";
import {
  FetchDataTypesE,
  useFetchDataAtInterval,
} from "../hooks/useFetchTimeAtInterval";

const ServerTime = () => {
  const { serverTime } = useFetchDataAtInterval({
    timeInterval: 30000,
    dataType: FetchDataTypesE.Server,
  });
  const [currentTime, setCurrentTime] = useState<number>();
  const [timeDifference, setTimeDifference] = useState<string>("00:00:00");

  //Set current time to current system time and update every second

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(Math.floor(Date.now() / 1000));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  //Whenever there is a change in serverTime/currentTime, calculate the time difference

  useEffect(() => {
    calculateTimeDifference();
  }, [serverTime, currentTime]);

  //Calculate the difference in time between server and client and display in stopclock format

  const calculateTimeDifference = () => {
    const difference = (currentTime || 0) - (serverTime || 0);

    const formatTime = (time: number) => time.toString().padStart(2, "0");

    const hrs = formatTime(Math.floor(difference / 3600));
    const mins = formatTime(Math.floor((difference % 3600) / 60));
    const secs = formatTime(difference % 60);

    setTimeDifference(`${hrs}:${mins}:${secs}`);
  };

  return (
    <div>
      <h1>Server Time: </h1>
      <div>{serverTime ? serverTime : "Loading..."}</div>
      <h1>Time Difference: </h1>
      <div>{timeDifference}</div>
    </div>
  );
};

export default ServerTime;
