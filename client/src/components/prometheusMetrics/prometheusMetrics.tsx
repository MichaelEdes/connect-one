import React from "react";
import styles from "./prometheusMetrics.module.scss";
import {
  FetchDataTypesE,
  useFetchDataAtInterval,
} from "../hooks/useFetchTimeAtInterval";

const PrometheusMetrics = () => {
  const { prometheusData } = useFetchDataAtInterval({
    timeInterval: 30000,
    dataType: FetchDataTypesE.Prometheus,
  });

  return (
    <div className={styles.container}>
      <h1>Prometheus Metrics</h1>
      <pre>{prometheusData ? prometheusData : "Loading..."}</pre>
    </div>
  );
};

export default PrometheusMetrics;
