import { Request, Response, NextFunction } from "express";
import { signinShema } from "../schema/zodSchemas";
import { signUPINQueries } from "../queries/signUpInqueries";

async function singinMiddelware(req : Request,res : Response,next : NextFunction) : Promise<void>
{
    const {email, password} : {email : string, password : string} = req.body;
    // 1st check the input validation using zod
    const userSchema = signinShema.safeParse({email,password});
    if(!userSchema.success)
    {
        res.json({
            action : 0,
            msg : "Invalid Input"
        });
        return;
    }
    // 2nd check if the user exist or not, Proccessed if the user not exist
    const isUserExits = await signUPINQueries(email);
    console.log(isUserExits);
    if(isUserExits.rows.length <= 0)
    {
        res.json({
            action : 0,
            msg : "Account not exists...Create one..."
        });
        return;
    }
    next();
}

export default singinMiddelware;