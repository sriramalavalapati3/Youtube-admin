const express = require("express");
require("dotenv").config();
const Joi = require("joi");
const authRoute = express.Router();
const { register, login } = require("../transaction");
const { validationResult, body } = require("express-validator");
const {handleRegister,handleLogin}=require('../controller')


authRoute.post("/register", handleRegister);

authRoute.post("/login",
 [ body("email").isEmail().withMessage("Invalid email").notEmpty(),
 body("password").notEmpty().withMessage("Password is required"),], handleLogin);


module.exports = { authRoute };
