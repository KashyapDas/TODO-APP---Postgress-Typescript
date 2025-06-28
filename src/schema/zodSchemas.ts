import zod from "zod";

export const signupSchema = zod.object({
    email : zod.string().email(),
    password : zod.string().min(2).max(20),
    username : zod.string()
}).strict();

export const signinShema = zod.object({
    username : zod.string(),
    password : zod.string()
}).strict();


