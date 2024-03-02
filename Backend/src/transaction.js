const { videomodel } = require("../models/video.model");
const { Adminmodel } = require("../models/Adminmodel");
const bcrypt = require("bcrypt");

const ObjectId = require("bson-objectid");
const jwt = require("jsonwebtoken");
require("dotenv").config();
//const { client } = require("./Redis/redis");
//delete by id

const delById = async function ({ id, req,page }) {
  try {
    const post = await videomodel.findOne({ _id: id });
   
    if (post.userID == req.body.user.userID) {
      const data = await videomodel.findByIdAndDelete({ _id: id });
      return { msg: true, message: "deleted successfully", Data: data ,"page":page };
    } else {
      return { msg: false, message: "unauthorized" };
    }
  } catch (error) {
    return error;
  }
};

const getData = async function (obj) {
  const { user, pageoffset, pageSize } = obj;
  const userID = user.userID;

  try {
    
   // let data = await videomodel.find({ userID });
     let data = await videomodel.find({ userID }).skip(pageSize * pageoffset).limit(pageSize);
    // data = data.sort((a, b) => {
    //   return b.createdAt - a.createdAt;
    // });

    // let arr = [];
    // let length = data.length;
    // let numOfPages = Math.ceil(length / 6);
    // for (let i = 1; i <= numOfPages; i++) {
    //   const startIndex = (i - 1) * 6;
    //   const endIndex = startIndex + 6;

    //   const paginatedData = data.slice(startIndex, endIndex);
    //   const obj = {
    //     page: i,
    //     data: paginatedData,
    //   };
    //   arr.push(obj);
    // }

    return {data,page:pageoffset};
  } catch (error) {
    return error;
  }
};

const getDataById = async function (id) {
  try {
    let data = await videomodel.findOne({ _id: id });
    return data;
  } catch (error) {
    return error;
  }
};

const patchDataById = async function (obj) {
  try {
    const { id, data1 } = obj;
    const data = await videomodel.findByIdAndUpdate({ _id: id }, data1, {
      new: true,
    });
    return data;
  } catch (error) {
    return error;
  }
};

const search = async function (title) {
  try {
    const regex = new RegExp(title, "i");
    const data = await videomodel.find({ Title: { $regex: regex } });
    // let arr = [];
    // let length = data.length;
    // let numOfPages = Math.ceil(length / 6);
    // for (let i = 1; i <= numOfPages; i++) {
    //   const startIndex = (i - 1) * 6;
    //   const endIndex = startIndex + 6;

    //   const paginatedData = data.slice(startIndex, endIndex);
    //   const obj = {
    //     page: i,
    //     data: paginatedData,
    //   };
    //   arr.push(obj);
    // }
    // console.log(arr);
    return data;
  } catch (error) {
    return error;
  }
};

const upload = async function (obj) {
  try {
    const { Title, video, description } = obj;
    const data = new videomodel({
      Title,
      video,
      description,
      userID: obj.user.userID,
    });
    await data.save();
    return data;
  } catch (error) {
    return error;
  }
};

const register = async function (obj) {
  try {
    const { username, email, password } = obj;
    const hashedPassword = await new Promise((resolve, reject) => {
      bcrypt.hash(password, 4, function (err, result) {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });

    if (hashedPassword) {
      const data = new Adminmodel({
        username,
        email,
        password: hashedPassword,
      });
      await data.save();
      console.log('hi')
      return { msg: true, Data: data };

    } else {
      return { msg: false, message: "error in hashing" };
    }
  } catch (error) {
    return { msg: false, msg: error.message };
  }
};

const login = async (obj) => {
  try {
    const { email, password } = obj;
    const user = await Adminmodel.findOne({ email });
    console.log(user._id);
    if (user) {
      const isPasswordCorrect = await new Promise((resolve, reject) => {
        bcrypt.compare(password, user.password, function (err, result) {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        });
      });

      if (isPasswordCorrect) {
        const token = await jwt.sign({ userID: user._id }, process.env.secret);
        const expiredToken = await jwt.sign(
          { userID: user._id },
          process.env.secret,
          { expiresIn: "0s" }
        );

        return {
          msg: true,
          message: "loginsuccessful",
          Token: token,
          expiry: expiredToken,
        };
      } else {
        return { msg: false, message: "wrong credentials" };
      }
    } else {
      console.log("hi3");
      return { msg: false, message: "not registerd" };
    }
  } catch (error) {
    return { error: error.message };
  }
};

module.exports = {
  delById,
  getData,
  getDataById,
  search,
  patchDataById,
  upload,
  register,
  login,
};
