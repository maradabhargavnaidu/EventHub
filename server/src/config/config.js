const config = {
  PORT: process.env.PORT || 5000,
  jwtSecret: process.env.JWT_SECRET || "secret",
  MONGO_URI: process.env.MONGO_URI || "mongodb://localhost:27017/EventHub",
};
module.exports = config;
