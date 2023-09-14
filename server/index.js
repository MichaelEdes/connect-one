const express = require("express");
const expressPrometheus = require("express-prometheus-middleware");
const cors = require("cors");

const app = express();
app.use(cors());

const PORT = 3001;

app.use(
  expressPrometheus({
    metricsPath: "/metrics",
    collectDefaultMetrics: true,
    // requestDurationBuckets: [0.1, 0.5, 1, 1.5],
    // requestLengthBuckets: [512, 1024, 5120, 10240, 51200, 102400],
    // responseLengthBuckets: [512, 1024, 5120, 10240, 51200, 102400],
    // authenticate: (req) => req.headers.authorization === "Basic mysecrettoken",
  })
);

app.get("/time", (req, res) => {
  res.json({
    properties: {
      epoch: {
        value: Math.floor(Date.now() / 1000),
        description:
          "The current server time, in epoch seconds, at time of processing the request.",
        type: "number",
      },
    },
    required: ["epoch"],
    type: "object",
  });
});
app.get("/metrics", (req, res) => {});

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
