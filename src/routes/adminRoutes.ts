import express from "express";

const router = express.Router();

router.post("/signup",(req,res)=>{
    res.json({
        msg : "Call from admin pannel..."
    })
})

export default router;