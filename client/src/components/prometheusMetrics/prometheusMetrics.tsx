import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./prometheusMetrics.module.scss";

const PrometheusMetrics = () => {
  const [prometheusData, setPrometheusData] = useState();

  useEffect(() => {
    const fetchPromData = async () => {
      try {
        const response = await axios.get("http://localhost:3001/metrics");
        setPrometheusData(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchPromData();

    const interval = setInterval(() => {
      fetchPromData();
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.container}>
      <h1>Prometheus Metrics</h1>
      <pre>{prometheusData}</pre>
    </div>
  );
};

export default PrometheusMetrics;
