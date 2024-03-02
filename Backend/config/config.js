require('dotenv').config()
const mongoose =require("mongoose");
// ... rest of the code

let db_url;
if(process.env.NODE_ENV=="dev"){
    db_url = process.env.mongolink
}
else if(process.env.NODE_ENV=="test"){
    db_url = process.env.DB_TEST_URL
}
const connection = mongoose.connect(db_url);

connection.then(() => {
  console.log("Database connected");
}).catch((error) => {
  console.error("Error connecting to database:", error);
});



module.exports={connection}