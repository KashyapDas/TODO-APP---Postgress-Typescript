import express from "express";
import signupMiddleware from "../middleware/signupMiddleware";
const router = express.Router();

router.post("/signup", signupMiddleware, async (req, res) => {
  res.json({
    msg: "Call from users signup..."
  });
});

export default router;
