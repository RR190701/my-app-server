//we will create controller fuctions for all the routes in this file
const User = require("./../models/User");
const ErrorResponse = require("./../utility/errorResponse");
// const sendEmail = require("../utils/sendEmail");
// const crypto = require("crypto")
// const bcrypt = require("bcryptjs");


const register = async (req, res, next) => {
  const { username, email, password, address } = req.body;

  if (!username||!email||!password||!address) {
    //sending error
    return next(new ErrorResponse("please provide an (email/ password/ username/ address)", 400));
  }
  try {

    const user = await User.create({
      username,
      email,
      password,
      address
    });

    sendToken(user, 201, res, user._id);

  } catch (error) {
    //sending error
    next(error);
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    //sending error
    return next(new ErrorResponse("please provide an email and password", 400));
  }

  //now to check if the user already exist or not!!
  try {
    const user = await User.findOne({ email }).select("password").select("_id");


    if (!user) {
      //sending error
      return next(
        new ErrorResponse("invalid Email", 401)
      );
    }

    //checking if password match
    const isMatch = await user.matchPasswords(password);

    if (!isMatch) {
      //sending error
      return next(
        new ErrorResponse("wrong password"),
        401
      );
    }
 sendToken(user, 200, res, user._id);
  } catch (error) {
    //sending error
    next(error);
  }
};


//A function that create a signed jwt token for the authentication of the user
const sendToken = (user, statusCode, res, id) => {
  const token = user.getSignedToken();
  res.status(statusCode).json({ success: true, token, id });
};

module.exports = { register, login};
