const express = require("express");
const expressPrometheus = require("express-prometheus-middleware");

const app = express();
const PORT = 3001;

app.get("/time", (req, res) => {});

app.get("/metrics", (req, res) => {});

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
