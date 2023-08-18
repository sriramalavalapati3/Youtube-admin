const express = require("express");
const Joi = require("joi");
const appRoute = express.Router();
const { check, validationResult } = require("express-validator");
const {handleDelete,handleGetData,handleGetDataById,handlePatchData,handleDataUpload,handleSearch}=require('../controller')


const dataSchema = [
  check("Title")
    .isString()
    .withMessage("Title must be a string")
    .isLength({ max: 20 })
    .withMessage("Title should not exceed 20 characters")
    .notEmpty()
    .withMessage("Title is required"),
  check("video")
    .isString()
    .withMessage("Video URL must be a string")
    .notEmpty()
    .withMessage("Video URL is required"),
  check("description")
    .isString()
    .withMessage("Description must be a string")
    .notEmpty()
    .withMessage("Description is required"),
  check("user")
    .isObject()
    .withMessage("User must be an object")
    .notEmpty()
    .withMessage("User is required"),
];

//delete by id

appRoute.delete("/delete",handleDelete );

//get data

appRoute.get("/data", );

// get data by id

appRoute.get("/data/:id",handleGetDataById );

// code for search functionality using query

appRoute.get("/Search",handleSearch);

//update by id

appRoute.patch("/update/:id",handlePatchData );

//code for upload process

appRoute.post("/upload",handleDataUpload );

module.exports = { appRoute };
