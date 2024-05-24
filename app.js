require("dotenv").config();
require("express-async-errors");

const express = require("express");
const app = express();
const cors = require("cors");

// packages
const morgan = require("morgan");

// DB
const connectDB = require("./db/connect");

// routers
const authRouter = require("./routes/authRoutes");
const petRouter = require("./routes/petRoutes");
const adoptionRouter = require("./routes/adoptionRoutes");

// middleware
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

app.use(cors());
app.use(morgan("tiny"));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Home page");
});

app.use("/api", authRouter);
app.use("/api/pet", petRouter);
app.use("/api/adoption", adoptionRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, console.log(`Server is listening on port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};

start();
