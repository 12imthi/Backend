import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./Database/config.js";
import router from "./Routers/userRouter.js";


dotenv.config();

const app = express();
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());

connectDB();

const PORT = 5000 || process.env.PORT;



app.get("/", (req, res) => {
  res.status(200).send("app is running");
});

app.use("/api",router)


app.listen(PORT, () => {
  console.log(`app is running ${PORT}`);
});
