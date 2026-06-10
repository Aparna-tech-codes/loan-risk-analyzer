import { createClient } from "redis";

async function test() {
  const client = createClient({
    url: "redis://localhost:6379",
  });

  client.on("error", (err) => {
    console.error("REDIS ERROR", err);
  });

  await client.connect();

  console.log("CONNECTED");

  const pong = await client.ping();

  console.log("PING:", pong);

  await client.quit();
}

test();
