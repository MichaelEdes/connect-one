import { useEffect, useState, useCallback } from "react";
import axios from "axios";

type UseFetchTimeAtIntervalPropsT = {
  timeInterval: number;
};

//UseFetchTimeAtInterval function that takes interval as argument and sets interval to given value so data is fetched at each time increment

export function useFetchTimeAtInterval({
  timeInterval,
}: UseFetchTimeAtIntervalPropsT) {
  const [serverTime, setServerTime] = useState<number>();

  const fetchTime = useCallback(async () => {
    try {
      const response = await axios.get("http://localhost:3001/time");
      setServerTime(response.data.epoch);
    } catch (err) {
      console.error(err);
    }
  }, []);

  useEffect(() => {
    fetchTime();
    const interval = setInterval(fetchTime, timeInterval);
    return () => clearInterval(interval);
  }, [fetchTime, timeInterval]);

  return { serverTime, fetchTime };
}
