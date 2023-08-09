const express=require("express");
const Joi = require("joi");
const appRoute=express.Router();
const { check, validationResult } = require('express-validator');
const {delById,getData,getDataById,search,patchDataById,upload}=require("../transaction")

const dataSchema = [
    check('Title').isString().withMessage('Title must be a string').isLength({ max: 20 }).withMessage('Title should not exceed 20 characters').notEmpty().withMessage('Title is required'),
    check('video').isString().withMessage('Video URL must be a string').notEmpty().withMessage('Video URL is required'),
    check('description').isString().withMessage('Description must be a string').notEmpty().withMessage('Description is required'),
    // check('user').isObject().withMessage('User must be an object').notEmpty().withMessage('User is required')
  ];




//delete by id

appRoute.delete("/delete/:id",async(req,res)=>{
    try {
          const id=req.params.id
        
          let  data= await delById({id,req})
         
          if(data.msg)
          {
          return res.status(200).send({"message":data.message,"data":data.Data})
          }
          console.log({"message":data.message})
          res.status(401).send({"message":data.message})
    } catch (error) {
        res.status(404).send({"msg":error.message})
    }
})

//get data 

appRoute.get("/data",async(req,res)=>{
    try {
       const arr= await getData(req.body)
     if(!arr)
     {
       return res.status(404).send({"msg":"fetched data Sucessfully","Data":[error.message]})
     }
     res.status(200).send(arr)  
    } catch (error) {
        res.status(404).send({"msg":error.message})
    }
})

// get data by id

appRoute.get("/data/:id",async(req,res)=>{
    try {
        const id=req.params.id
        const Data=await getDataById(id)
        if(!Data)
        {
          return res.status(404).send({"msg":"error in fetching data Sucessfully","Data":"no data found"})
        }
        res.status(200).send({"msg":"fetched data Sucessfully","Data":Data})

    } catch (error) {
        res.status(404).send({"msg":error.message})
    }
})

// code for search functionality using query

appRoute.get("/Search",async(req,res)=>{
    const title=req.query.search;
    try {
       
        const arr=await search(title)
        res.status(200).send(arr)
    } catch (error) {
        res.status(404).send({"msg":error.message})
    }
})

//update by id 

appRoute.patch("/update/:id",dataSchema,async(req,res)=>{
    try {
          const id=req.params.id
          if(id)
          {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
              return res.status(400).json({ errors: errors.array() });
            }
              const data1=req.body
              const data= await patchDataById({id,data1})
            return  res.status(200).send({"msg":"updated succesfully","Data":data})
          } 
         
    } catch (error) {
        res.status(404).send({"msg":error.message})
    }
})


//code for upload process  

appRoute.post("/upload",dataSchema,async(req,res)=>{
    try {
       
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
       const data=await upload(req.body)
        res.status(200).send({"msg":"uploaded Sucessfully"})
    } catch (error) {
        res.status(404).send({"msg":error.message})
    }
})

module.exports={appRoute}
