import React from "react";
import styles from "./Home.module.scss";
import ServerTime from "../../components/serverTime/serverTime";
import PrometheusMetrics from "../../components/prometheusMetrics/prometheusMetrics";
import Header from "../../components/header/header";
import Footer from "../../components/footer/footer";

function Home() {
  return (
    <div className={styles.container}>
      <Header />
      <main>
        <aside>
          <ServerTime />
        </aside>
        <aside>
          <PrometheusMetrics />
        </aside>
      </main>
      <Footer />
    </div>
  );
}

export default Home;
