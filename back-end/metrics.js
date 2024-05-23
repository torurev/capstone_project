const express = require("express");
const client = require("prom-client");

const router = express.Router();

// Initialize default metrics collection
const collectDefaultMetrics = client.collectDefaultMetrics;
collectDefaultMetrics();

// Metrics endpoint
router.get("/metrics", async (req, res) => {
  res.setHeader("Content-Type", client.register.contentType);
  const metrics = await client.register.metrics();
  res.send(metrics);
});

// Example endpoint to trigger errors
router.get("/error", (req, res) => {
  errorRate.inc();
  res.status(500).send("Something went wrong!");
});

// Custom metrics
const requestDuration = new client.Histogram({
  name: "app_request_duration_seconds",
  help: "Duration of HTTP requests in seconds",
  buckets: [0.1, 0.5, 1, 1.5, 2, 5],
});

const errorRate = new client.Counter({
  name: "app_error_rate",
  help: "Count of errors encountered by the application",
});

const requestCount = new client.Counter({
  name: "app_request_count",
  help: "Total number of requests received",
});

// Register custom metrics
client.register.registerMetric(requestDuration);
client.register.registerMetric(errorRate);
client.register.registerMetric(requestCount);

module.exports = { router, requestDuration, errorRate, requestCount };
