const express = require("express");
require("dotenv").config();
const Joi = require("joi");
const authRoute = express.Router();
const { register, login } = require("../transaction");
const { validationResult, body } = require("express-validator");

const registerSchema = Joi.object({
  username: Joi.string().max(20).required(),
  email: Joi.string().max(30).required(),
  password: Joi.string().required(),
});

/**
 * @swagger
 * /api/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/users'
 *     responses:
 *       200:
 *         description: Successfully registered
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *     400:
 *       description: Bad Request
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               msg:
 *                 type: string
 *     404:
 *       description: Not Found
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               msg:
 *                 type: string
 *     500:
 *       description: Internal Server Error
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               msg:
 *                 type: string
 */

authRoute.post("/register", async (req, res) => {
  try {
    const { error } = registerSchema.validate(req.body);
    if (error) {
      // Return 400 Bad Request with validation error details
      return res.status(400).send({ msg: error.details[0].message });
    }

    let data = await register(req.body);
    if (data.msg) {
      return res.status(500).send({ msg: data });
    }
    res.status(200).send({ msg: "registered successfully" });
  } catch (error) {
    res.status(404).send({ msg: error.message });
  }
});

authRoute.post(
  "/login",
  [
    body("email").isEmail().withMessage("Invalid email").notEmpty(),
    body("password").notEmpty().withMessage("Password is required"),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const data = await login(req.body);

      if (data.msg === false) {
        return res.status(401).send(data);
      }

      res.cookie("token", data.Token, { httpOnly: true });

      res.status(200).send({
        msg: data.msg,
        message: data.message,
        token: data.Token,
        expiry: data.expiry,
      });
    } catch (error) {
      return res.status(500).send({ msg: error.message });
    }
  }
);

authRoute.post;

module.exports = { authRoute };
