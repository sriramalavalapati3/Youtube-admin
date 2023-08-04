const express=require("express");
const Joi = require("joi");
const appRoute=express.Router();

const {delById,getData,getDataById,search,patchDataById,upload}=require("../transaction")

const uploadSchema = Joi.object({
    Title: Joi.string().max(20).required(),
    video: Joi.string().required(),
    description:Joi.string().required(),
    user:Joi.object().required()
  });

const editSchema=Joi.object({
    Title: Joi.string().max(20),
    video: Joi.string(),
    description:Joi.string(),
    user:Joi.object().required()
})


//delete by id

appRoute.delete("/delete/:id",async(req,res)=>{
    try {
          const id=req.params.id
        
          let  data= await delById({id,req})
         
          if(data.msg)
          {
          return res.status(200).send({"message":data.message})
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
       const Data= await getData(req.body)
     if(!Data)
     {
       return res.status(404).send({"msg":"fetched data Sucessfully","Data":[error.message]})
     }
     res.status(200).send({"msg":"fetched data Sucessfully","Data":Data})  
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
    try {
        const title=req.query.search;
        const data=await search(title)
        res.status(200).send({data})
    } catch (error) {
        res.status(404).send({"msg":error.message})
    }
})

//update by id 

appRoute.patch("/update/:id",async(req,res)=>{
    try {
          const id=req.params.id
          if(id)
          {
            const {error}=editSchema.validate(req.body)
            if (error) {
                return res.status(400).send({ msg: error.details[0].message });
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

appRoute.post("/upload",async(req,res)=>{
    try {
       
        const {error}=uploadSchema.validate(req.body)
        if (error) {
            return res.status(400).send({ msg: error.details[0].message });
          }
       const data=await upload(req.body)
        res.status(200).send({"msg":"uploaded Sucessfully"})
    } catch (error) {
        res.status(404).send({"msg":error.message})
    }
})

module.exports={appRoute}
