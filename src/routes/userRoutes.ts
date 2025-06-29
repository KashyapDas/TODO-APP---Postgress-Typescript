import express from "express";
import signupMiddleware from "../middleware/signupMiddleware";
import { getClient } from "../db/db";
import jwt from "jsonwebtoken";
import jwtSecret from "../auth/secret";

const router = express.Router();

router.post("/signup", signupMiddleware, async (req, res) => {
  // create user and store in db and return the id,
  const {email, password, username} = req.body;
  const client = await getClient();
  const userQuery = `
  INSERT INTO users(email, password, username) VALUES ($1, $2, $3);
  `;
  await client.query(userQuery, [email, password, username]);
  // create the jwt token and parse it to the email only
  const jwtToken = jwt.sign({
    email,
  }, jwtSecret);
  console.log(jwtToken);
  // send response to the frontend
  res.json({
    action : 1,
    msg: "Account created successfully",
    token : jwtToken
  });
});

export default router;
