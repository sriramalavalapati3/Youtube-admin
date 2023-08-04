require('dotenv').config()
const mongoose =require("mongoose");
require('dotenv').config();

// ... rest of the code

let db_url;
if(process.env.NODE_ENV=="dev"){
    db_url = process.env.mongolink
}
else if(process.env.NODE_ENV=="test"){
    db_url = process.env.DB_TEST_URL
}
console.log(db_url)
const connection=mongoose.createConnection(`${db_url}`).on('open',()=>{console.log("Database connected")}).on('error',()=>{console.log('errormessage=database')})



module.exports={connection}