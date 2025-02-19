const userModel =require( "../models/userModel.js");
const { comparePassword, hashPassword } =require( "./../helpers/authHelper.js");
const JWT = require("jsonwebtoken");

 const registerController = async (req, res) => {
  try {
    const { name, email, password, phonenumber, address,answer  } = req.body;
    //validations
    if (!name) {
      return res.send({ error: "Name is Required" });
    }
    if (!email) {
      return res.send({ error: "Email is Required" });
    }
    if (!password) {
      return res.send({ error: "Password is Required" });
    }
    if (!phonenumber) {
      return res.send({ error: " phonenumber  is Required" });
    }
    if (!address) {
      return res.send({ error: "Address is Required" });
    }
    if (!answer) {
        return res.send({ error: "answer is Required" });
      }
    //check user
    const exisitingUser = await userModel.findOne({ email });
    //exisiting user
    if (exisitingUser) {
      return res.status(200).send({
        success: true,
        message: "Already Register please login",
      });
    }
    //register user
    const hashedPassword = await hashPassword(password);
    //save
    const user = await new userModel({
      name,
      email,
      phonenumber,
      address,
      password: hashedPassword,
      answer
    }).save();

    res.status(201).send({
      success: true,
      message: "User Register Successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Errro in Registeration",
      error,
    });
  }
};

//POST LOGIN
 const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    //validation
    if (!email || !password) {
      return res.status(404).send({
        success: false,
        message: "Invalid email or password",
      });
    }
    //check user
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Email is not registerd",
      });
    }
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(200).send({
        success: false,
        message: "Invalid Password",
      });
    }
    //token
   
    const token =await JWT.sign({ _id: user._id }, process.env.SECRET_TOKEN, { expiresIn: '30d' });

    if (!token) {
      return res.status(403).json({ message: "JWT must be provided" });
    }
    res.status(200).send({
      success: true,
      message: "login successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phonenumber: user.phonenumber,
        address: user.address,
        role:user.role,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in login",
      error,
    });
  }
};

//test controller
 const testController = (req, res) => {
  try {
    res.send("Protected Routes");
  } catch (error) {
    console.log(error);
    res.send({ error });
  }
};
const ForgotPasswordController=async(req,res)=>{
  const {email,answer,newpassword}=req.body;
  
  try {
    if (!email) {
      return res.send({ error: "email is Required" });
    }
    if (!answer) {
      return res.send({ error: "answer is Required" });
    }
    if (!newpassword) {
      return res.send({ error: "newPassword is Required" });
    }
    const user = await userModel.findOne({email,answer});
  
    if(!user ){
      return res.status(405).send({
        success:false,
        message:"user not found try again wrong email or answer"
      });
    }
    const hashed = await hashPassword(newpassword)
    await userModel.findByIdAndUpdate(user._id,{password:hashed});
    res.status(200).send({
      success:true,
      message: "new password updated successfully"
    })
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in resering password",
      error,
    });
  }
}

const updateProfileController=async(req,res)=>{
 try {
  const {name,password,email,phonenumber, address}=req.body;
 const user =await userModel.findById(req.user._id);
 if(!password  && password.length < 7){
  return res.json("passoword is required!")
 }
  const hashedPassword = password? await hashPassword(password) : undefined;
 const updatedUserProfile =await userModel.findByIdAndUpdate(req.user._id,{
  name:name ||name.user,
  email:email || email.user,
  address:address || address.user,
  phonenumber:phonenumber || phonenumber.user,
  password: hashedPassword || password.user
 },{new:true});

 res.status(200).send({
  success:true,
  message:"profile Updated Succesfully!",
  updatedUserProfile
 })
  } catch (error) {
  console.log(error);
    res.status(500).send({
      success: false,
      message: "Error  while updating a user",
      error,
  })
  }
}
module.exports={registerController,loginController,
  testController,ForgotPasswordController,updateProfileController}