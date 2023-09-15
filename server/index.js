const express = require("express");
const expressPrometheus = require("express-prometheus-middleware");
const cors = require("cors");

const app = express();
app.use(cors());

const PORT = 3001;
const authToken = "mysecrettoken";

app.use((req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader !== authToken) {
    return res
      .status(403)
      .json({ message: "Forbidden: Invalid or missing authorization token." });
  }

  next();
});

app.use(
  expressPrometheus({
    metricsPath: "/metrics",
    collectDefaultMetrics: true,
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
