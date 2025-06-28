import { Client } from "pg";

export async function getClient() {
    const client = new Client("postgresql://neondb_owner:npg_tTkX6YBnPvp8@ep-still-silence-a8ib2crk-pooler.eastus2.azure.neon.tech/neondb?sslmode=require&channel_binding=require");
    await client.connect();
    // Now create the table also
    return client;

}