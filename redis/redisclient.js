const redis = require("redis");
const { performance } = require('perf_hooks');

const client = redis.createClient({
  host: "localhost", // Redis server hostname
  port: 6379, // Redis server port
});

// Handle connection events
client.connect().then(async () => {
  try {
    const start = performance.now();
    await client.flushDb();

    for (i = 0; i < 1000000; i++) {
      const user = {
        name: "user" + i,
        email: "user-email" + i + "@example.com",
        age: "30",
      };
      await client.hSet("user:" + i, user);
    }
    for (i = 0; i < 1000000; i++) {
      const savedProfile = await client.hGetAll("user:" + i);
      console.log("Get:", savedProfile);
    }
    const end = performance.now();
    console.log(`Time taken for creating and retrieving 1 million entries: ${(end - start).toFixed(2)} ms`);

  } catch (err) {
    console.error("Error:", err);
  } finally {
    await client.quit();
  }
});
