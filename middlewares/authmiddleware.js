const JWT = require("jsonwebtoken");
const userModel =require ("../models/userModel.js");
const token = require("../controllers/authController.js")

const requireSignIn = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).send({ message: "Token must be provided" });
    }
    const decoded = JWT.verify(token, process.env.SECRET_TOKEN);
    req.user = decoded; 
    next(); 

  } catch (error) {
    console.log(error);
    res.status(401).send({ message: "Invalid token" });
  }
};


//admin acceess
const isAdmin = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.user._id);
    if (user.role !== 1) {  // Admin role is 1
      return res.status(401).send({
        success: false,
        message: "UnAuthorized Access",
      });
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
    res.status(401).send({
      success: false,
      error,
      message: "Error in admin middleware",
    });
  }
};

module.exports={requireSignIn,isAdmin}