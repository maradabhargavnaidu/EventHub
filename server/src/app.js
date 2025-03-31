const express = require("express");
const cors = require("cors");
const app = express();

app.use(
  cors({
    methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
    origin: "*",
  })
);

// app.options("*", cors());
app.use(express.json());

app.use("/api/auth", require("./routes/auth.routes"));

module.exports = app;
