const mongoose = require("mongoose");
const { connection } = require("../config/config");

const adminSchema = mongoose.Schema(
  {
    username: { 
        type: String,
         required: true
              },
    email: { 
        type: String,
         required: true
           },
    password: { type: String,
         required: true 
              },
  },
  { 
    timestamps: true 
  }
);

const Adminmodel = connection.model("Admin", adminSchema);

module.exports = { Adminmodel };
