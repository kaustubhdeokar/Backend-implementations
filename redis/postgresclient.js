const { Client } = require("pg");

// Create a PostgreSQL client
const client = new Client({
  host: "localhost",
  port: 5432,
  user: "postgres",
  password: "postgres",
  database: "postgres",
});

async function addEntries() {
  try {
    // Connect to the PostgreSQL server
    await client.connect();
    console.log("Connected to PostgreSQL");

    // Create a table if it doesn't exist
    await client.query(
      `CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100),
        email VARCHAR(100))`
    );

    for (i = 0; i < 1000000; i++) {
      const insertQuery = `INSERT INTO users (name, email) VALUES ($1, $2)`;
      const values = ["John Doe" + i, "john.doe" + i + "@example.com"];
      const res = await client.query(insertQuery, values);
      console.log("Inserted rows:", res.rows);
    }

    for (id = 0; id < 1000000; id++) {
      const res = await client.query('select name,email from users where id=$1',[id]);
      console.log("Inserted rows:", res);
    }
  } catch (err) {
    console.error("Error:", err);
  } finally {
    // Close the connection
    await client.end();
    console.log("Disconnected from PostgreSQL");
  }
}

addEntries();
