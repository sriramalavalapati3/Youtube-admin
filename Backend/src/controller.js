const {register,login,getData,getDataById,search,patchDataById,upload,delById}=require('./transaction')
const Joi = require("joi");
const { check, validationResult } = require("express-validator");

const registerSchema = Joi.object({
    username: Joi.string().max(20).required(),
    email: Joi.string().max(30).required(),
    password: Joi.string().required(),
  });
 
  

const handleRegister=async (req, res) => {
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
  }



const handleLogin=async (req, res) => {
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


const handleDelete=async (req, res) => {
    try {
      const id = req.query.id;
      const page=req.query.page
  
      let data = await delById({ id, req,page });
  
      if (data.msg) {
        console.log(data.Data);
        return res.status(200).send({ message: data.message, data: data.Data,"Page":page });
      }
      console.log({ message: data.message });
      res.status(401).send({ message: data.message });
    } catch (error) {
      res.status(404).send({ msg: error.message });
    }
  }


const handleGetData=async (req, res) => {
    try {
      const pageoffset = req.query.pageoffset;
      const pageSize = req.query.pageSize;
      const { user } = req.body;
      const arr = await getData({ user, pageoffset, pageSize });
      if (!arr) {
        return res
          .status(404)
          .send({ msg: "fetched data Sucessfully", Data: [error.message] });
      }
      res.status(200).send(arr);
    } catch (error) {
      res.status(404).send({ msg: error.message });
    }
  }


const handleGetDataById=async (req, res) => {
    try {
      const id = req.params.id;
      const Data = await getDataById(id);
      if (!Data) {
        return res
          .status(404)
          .send({
            msg: "error in fetching data Sucessfully",
            Data: "no data found",
          });
      }
      res.status(200).send({ msg: "fetched data Sucessfully", Data: Data });
    } catch (error) {
      res.status(404).send({ msg: error.message });
    }
  }
  


const handleSearch= async (req, res) => {
    const title = req.query.search;
    try {
      const arr = await search(title);
      res.status(200).send(arr);
    } catch (error) {
      res.status(404).send({ msg: error.message });
    }
  }



const handlePatchData=async (req, res) => {
    try {
      const id = req.params.id;
      if (id) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
        const data1 = req.body;
        const data = await patchDataById({ id, data1 });
        return res.status(200).send({ msg: "updated succesfully", Data: data });
      }
    } catch (error) {
      res.status(404).send({ msg: error.message });
    }
  }



const handleDataUpload=async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const data = await upload(req.body);
      res.status(200).send({ msg: "uploaded Sucessfully" });
    } catch (error) {
      res.status(404).send({ msg: error.message });
    }
  }


module.exports={handleRegister,handleLogin,handleDelete,handleGetData,handleGetDataById,handleSearch,handlePatchData,handleDataUpload}