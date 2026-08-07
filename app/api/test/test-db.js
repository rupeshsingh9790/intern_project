const mariadb = require("mariadb");

async function test() {
  try {
    const conn = await mariadb.createConnection({
      host: "127.0.0.1",
      port: 3306,
      user: "root",
      password: "",
      database: "admin_panel",
    });

    console.log("✅ Connected successfully");
    await conn.end();
  } catch (err) {
    console.error("❌ Connection failed");
    console.error(err);
  }
}

test();