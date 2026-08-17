
import express from "express";
import dotenv from "dotenv";
import authRouter from "./routes/auth.route.js";
import messageRouter from "./routes/message.route.js";

dotenv.config();

const PORT = process.env.PORT;

const app = express();

app.use("/api/auth", authRouter);
app.use("/api/messages", messageRouter);

app.listen(PORT, () =>
  console.log("Chatify App is up and runing on PORT:", PORT),
);
