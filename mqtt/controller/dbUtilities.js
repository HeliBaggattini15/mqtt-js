const { pool } = require("./db");

export default () => {
    async function insertData(name, color) {
        const res = await pool.query(
            "INSERT INTO shark (name, color) VALUES ($1, $2)",
            [name, color]
        );
        console.log(`Added a shark with the name ${name}`);
    }
}

