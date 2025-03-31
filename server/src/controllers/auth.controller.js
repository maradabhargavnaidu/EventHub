const jwt = require("jsonwebtoken");
const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/Users");
const JWTService = require("../services/JWTService");
const jwt_secret = require("../config/config").jwtSecret;
const {
  loginSchema,
  registerSchema,
} = require("../validations/user.validation");

const register = async (req, res) => {
  const { error: validationError } = registerSchema.validate(req.body);
  if (validationError) return res.status(400).json(validationError);
  const { name, mail, phoneNumber, password, role } = req.body;
  try {
    const findUser = await User.findOne({ mail });
    if (findUser)
      return res.status(400).json({ message: "User already exists" });
    const hashPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      mail,
      phoneNumber,
      password: hashPassword,
      role,
    });

    if (user) {
      const token = JWTService.sign(
        { id: user._id.toString(), role },
        jwt_secret,
        "24h"
      );
      const data = { name, mail, token };
      return res
        .status(201)
        .json({ message: "User registered successfully ", user: data });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error registering user" });
  }
};

const login = async (req, res) => {
  const { mail, password, role } = req.body;
  // console.log(req.body);
  const { error: validationError } = loginSchema.validate(req.body);
  if (validationError) return res.status(422).send(validationError);
  try {
    const findUser = await User.findOne({ mail });
    if (!findUser) res.status(409).json({ message: "Invalid Credentials" });
    console.log(findUser);
    const isPasswordValid = await bcrypt.compare(password, findUser.password);
    if (!isPasswordValid)
      return res.status(409).json({ message: "Invalid Credentials" });
    const jwtToken = JWTService.sign(
      {
        id: findUser._id.toString(),
        role: findUser.role,
      },
      jwt_secret,
      "24h"
    );
    const fullName = findUser.fullName;
    const data = { fullName, mail, token: jwtToken };
    return res.status(201).send({ user: data });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error logining user" });
  }
};

const Profile = async (req, res) => {
  const header = req.headers;
  console.log(header.authorization);
  let token = "";
  if (header != undefined) {
    token = header.authorization;
  }
  if (!token) return res.status(400).json({ error: "Not authenticated" });
  try {
    const validToken = JWTService.verify(token, jwt_secret);
    if (validToken) {
      const user = await User.findById({ _id: validToken.id });
      res.json({ user: { fullName: user.username, mail: user.mail, token } });
    }
  } catch (err) {
    console.log(err);
    return res.status(400).json({ error: err });
  }
};

module.exports = { register, login, Profile };
