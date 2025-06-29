import createTable from "../db/createTable";
import { getClient } from "../db/db";

export async function signUPINQueries(email : string)
{
    const client = await getClient();
    await createTable();

    const userQuery = `
    SELECT * from users where email = $1
    `
    const userResponse = await client.query(userQuery,[email]);
    client.end();
    return userResponse;
} 