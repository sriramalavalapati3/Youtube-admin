const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const verifyAsync = promisify(jwt.verify);


const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
     console.log(token)
      if(token)
      {
        const decoded = await verifyAsync(token, process.env.secret);
        console.log(decoded)
        req.body.user = decoded;
        next();
      }else{
        return res.status(401).json({ msg: "unauthorized" });
      }
    
  
     
   
  } catch (error) {
   
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};

module.exports = { auth };
