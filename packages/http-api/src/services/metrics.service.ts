import client from "prom-client";

const register = new client.Registry();

client.collectDefaultMetrics({
  register,
});

export const httpRequestCounter = new client.Counter({
  name: "http_requests_total",
  help: "Total HTTP requests",
  labelNames: ["method", "route", "status"],
  registers: [register],
});

export const getMetrics = async () => {
  return register.metrics();
};

export const metricsRegister = register;
