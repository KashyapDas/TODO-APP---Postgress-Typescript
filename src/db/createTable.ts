import { getClient } from "./db";

async function createTable() {
    const client = await getClient();
    const userQuery = `
    CREATE TABLE IF NOT EXISTS users(
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    username VARCHAR(255) NOT NULL
    );
    `;
    await client.query(userQuery);
    client.end();
}

export default createTable;