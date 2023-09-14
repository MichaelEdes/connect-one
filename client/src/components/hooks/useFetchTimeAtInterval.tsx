import { useEffect, useState, useCallback } from "react";
import axios from "axios";

type UseFetchDataAtIntervalPropsT = {
  timeInterval: number;
  dataType: FetchDataTypesE.Prometheus | FetchDataTypesE.Server;
};

export enum FetchDataTypesE {
  Prometheus = "prometheus",
  Server = "server",
}

//UseFetchTimeAtInterval function that takes interval as argument and sets interval to given value so data is fetched at each time increment

export function useFetchDataAtInterval({
  timeInterval,
  dataType,
}: UseFetchDataAtIntervalPropsT) {
  const [serverTime, setServerTime] = useState<number>();
  const [prometheusData, setPrometheusData] = useState();

  const fetchTime = useCallback(async () => {
    try {
      const response = await axios.get("http://localhost:3001/time");
      setServerTime(response.data.properties.epoch.value);
    } catch (err) {
      console.error(err);
    }
  }, []);

  const fetchPromData = useCallback(async () => {
    try {
      const response = await axios.get("http://localhost:3001/metrics");
      setPrometheusData(response.data);
    } catch (err) {
      console.error(err);
    }
  }, []);

  const fetchDataFunction =
    dataType === "prometheus" ? fetchPromData : fetchTime;

  useEffect(() => {
    dataType === "prometheus" ? fetchPromData() : fetchTime();
    const interval = setInterval(fetchDataFunction, timeInterval);
    return () => clearInterval(interval);
  }, [fetchDataFunction, timeInterval]);

  if (dataType === "prometheus") {
    return { prometheusData, fetchPromData };
  } else {
    return { serverTime, fetchTime };
  }
}
