import express from "express";
import cors from "cors";
import userRouter from "./routes/userRoutes";
import adminRouter from "./routes/adminRoutes"; 

const app = express();

app.use(cors());
app.use(express.json());

app.use("/users/api/v1",userRouter);
app.use("/admin/api/v1",adminRouter);



app.listen(3000,()=>console.log("Server started successfully"));