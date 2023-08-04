const express=require("express");
const app=express();
const swaggerjsdoc=require("swagger-jsdoc");
const swaggerui=require("swagger-ui-express");
const cors=require("cors");
require('dotenv').config();
var cookieParser = require('cookie-parser')
// importing 
const {connection}=require("../config/config");
const {appRoute}=require("./routes/CRUD.routes");
const {authRoute}=require("./routes/auth.routes");
const {auth}=require("../middlewares/auth.middleware")

//middlewares
app.use(express.json());
app.use(cors());
app.use(cookieParser())

//==================================swagger code

const options={
    definition:{
        openapi: "3.0.0",
        info:{
            title:"B-cube Admin Pannel Api's",
            version:"0.1",
            description:
            "This is Admin Pannel Api Documentation for the B-cube which is a powerfull Admin Pannel",
            contact:{
                name:"sriram",
                email:"sriramalavalapatiit01@gmail.com"
            }

        },
        servers:[
            {
                url:"http://localhost:8080"
            },
        ],
    },
    apis:["./routes/*routes.js"]
}

//===============================================================>

const spacs=swaggerjsdoc(options);
app.use("/api-docs",swaggerui.serve,swaggerui.setup(spacs))






app.use("/api",authRoute)

app.get("/",async(req,res)=>{
    try {
        
        res.send({"msg":"welcome to mychannel 😂😂😂"})
    } catch (error) {
        res.send(error.message)
    }
    })

app.use(auth)
app.use("/api",appRoute)









// server code 

app.listen(process.env.Port || 4500,async()=>{
try {
    await connection
    console.log(`server running at port no ${process.env.Port || 4500}`)
} catch (error) {
    console.log(error.message)
}
})

module.exports={app}