// Import Modules
const express = require("express");
const app = express();
const dotenv = require("dotenv");
const connectDb = require("./config/config");
const userRouter = require("./routes/user.route");

//Set environment variables
dotenv.config({ path: "./config/.env" });

//middlewares
app.use(express.json());

//Routing
app.use("/api/v1/user", userRouter);

//Connecting Server
const connectServer = async () => {
  try {
    connectDb();
    await app.listen(process.env.PORT || 3001, () => {
      console.log(
        `Server is listening with ${process.env.MODE} mode on port: ${process.env.PORT}`
      );
    });
  } catch (err) {
    console.log(
      "Sorry! Could not connect to the server with error: " + err.message
    );
  }
};

connectServer();
