const app = require("./app");
const mongoose = require("mongoose");
const { PORT, MONGO_URL } = require("./config/config");
require("dotenv").config();
const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URL);
    console.log("Database connected successfully");
  } catch (err) {
    console.error("Database connection failed:", err);
    process.exit(1);
  }
};

const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
  });
};

startServer();
