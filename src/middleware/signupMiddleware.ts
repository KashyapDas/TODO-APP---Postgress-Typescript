import { Request, Response, NextFunction } from "express";
import { signupSchema } from "../schema/zodSchemas";
import { signUPINQueries } from "../queries/signUpInqueries";

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
    const userResponse = await signUPINQueries(email);

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