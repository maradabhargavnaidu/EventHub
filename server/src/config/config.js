require("dotenv").config();
const config = {
  PORT: process.env.PORT || 5000,
  jwtSecret: process.env.JWT_SECRET || "secret",
  // MONGO_URL: process.env.MONGO_URL,
  MONGO_URL: "mongodb://localhost:27017/EventHub",
};
module.exports = config;
