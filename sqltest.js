const sql = require("mssql");

// Database configuration
const config = {
  user: "myusername", // update me
  password: "Yearup2024!", // update me
  server: "yearup.database.windows.net", // update me
  database: "yearupdemo", // update me
  options: {
    encrypt: true,
  },
};

async function connectToDatabase() {
  try {
    let pool = await sql.connect(config);
    console.log("Connected to the database");
    return pool;
  } catch (err) {
    console.error("Connection error:", err.message);
    throw err;
  }
}

async function selectWithWhere(pool) {
  try {
    let result = await pool
      .request()
      .query(
        "SELECT id, title, director, year, length_minutes FROM movies WHERE year > 2004"
      );
    console.log("SELECT with WHERE clause:");
    result.recordset.forEach((row) => {
      console.log(
        `${row.id}\t${row.title}\t${row.director}\t${row.year}\t${row.length_minutes}`
      );
    });
  } catch (err) {
    console.error("Error in SELECT with WHERE:", err.message);
  }
}

async function selectWithOrderBy(pool) {
  try {
    let result = await pool
      .request()
      .query(
        "SELECT id, title, director, year, length_minutes FROM movies ORDER BY length_minutes DESC"
      );
    console.log("SELECT with ORDER BY clause:");
    result.recordset.forEach((row) => {
      console.log(
        `${row.length_minutes}\t${row.title}\t${row.id}\t${row.director}\t${row.year}`
      );
    });
  } catch (err) {
    console.error("Error in SELECT with ORDER BY:", err.message);
  }
}

async function insertMovie(pool) {
  try {
    let result = await pool
      .request()
      .query(
        "INSERT INTO movies (id, title, director, year, length_minutes) VALUES (55, 'Imagintive Movie Title', 'Lupe Argumedo', 2024, 90)"
      );
    console.log("INSERT result:", result.rowsAffected);
  } catch (err) {
    console.error("Error in INSERT:", err.message);
  }
}

async function updateMovie(pool) {
  try {
    let result = await pool
      .request()
      .query("UPDATE movies SET length_minutes = 130 WHERE id = 55");
    console.log("UPDATE result:", result.rowsAffected);
  } catch (err) {
    console.error("Error in UPDATE:", err.message);
  }
}

async function deleteMovie(pool) {
  try {
    let result = await pool.request().query("DELETE FROM movies WHERE id = 27");
    console.log("DELETE result:", result.rowsAffected);
  } catch (err) {
    console.error("Error in DELETE:", err.message);
  }
}

async function runQueries() {
  let pool;
  try {
    pool = await connectToDatabase();
    //await selectWithWhere(pool);
    await insertMovie(pool);
    await selectWithOrderBy(pool);
    //await updateMovie(pool);
    //await deleteMovie(pool);
  } catch (err) {
    console.error("Error:", err.message);
  } finally {
    if (pool) {
      pool.close();
    }
  }
}

runQueries();
