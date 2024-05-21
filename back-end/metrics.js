const express = require("express")
const client = require("prom-client")

const router = express.Router()

// Initialize default metrics collection
const collectDefaultMetrics = client.collectDefaultMetrics
collectDefaultMetrics()

// Metrics endpoint
router.get("/metrics", async (req, res) => {
  res.setHeader("Content-Type", client.register.contentType)
  const metrics = await client.register.metrics()
  res.send(metrics)
})

module.exports = router
