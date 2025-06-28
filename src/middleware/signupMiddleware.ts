import { Request, Response, NextFunction } from "express";
import { signupSchema } from "../schema/zodSchemas";
import { getClient } from "../db/db";
import createTable from "../db/createTable";

async function signupMiddleware(req : Request, res : Response ,next : NextFunction) : Promise<void>
{
    const {email, password, username} = req.body;
    // Check input validation first 
    const schemaResponse = signupSchema.safeParse({email, password, username});
    if(!schemaResponse.success)
    {
        res.json({
            action : 0,
            msg : "Invaid Inputs...",
        })
        return;
    }
    // Check the user already exist or not - find based on the email
    const client = await getClient();
    await createTable();

    const userQuery = `
    SELECT * from users where email = $1
    `
    const userResponse = await client.query(userQuery,[email]);
    client.end();
    if(userResponse.rows[0])
    {
        res.json({
            action : 0,
            msg : "This account already exist...Try to login..."
        });
        return;
    }

    next();
}
export default signupMiddleware;