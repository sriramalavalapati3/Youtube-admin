const mongoose=require("mongoose");
const { connection } = require("../config/config");

const videoSchema=mongoose.Schema({
    "Title":{
        type:String,
        required:true
            },
    "video":{
        type:String,
        required:true
    },
    "description":{
        type:String,
        required:true
    },
    "userID":mongoose.Schema.Types.ObjectId
},
{ 
    timestamps: true
 })

const videomodel=mongoose.model("video",videoSchema)

module.exports={videomodel}