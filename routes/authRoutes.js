const express =require("express");

const {registerController,loginController,
      testController,ForgotPasswordController,updateProfileController}  = require("../controllers/authController.js");

const { isAdmin, requireSignIn } =require("../middlewares/authMiddleware.js");

//router object
const router = express.Router();

//routing
//REGISTER || METHOD POST
router.post("/register", registerController);

//LOGIN || POST
router.post("/login", loginController);
//forgot password
router.post('/forgot-password',ForgotPasswordController)
//test routes
router.get("/test", requireSignIn, isAdmin, testController);

// protected user auth
router.get("/user-auth",requireSignIn,(req,res)=>{
  res.status(200).send({
    ok:true
  });
})
//protected admin auth

router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});
router.put("/user-update-profile",requireSignIn,updateProfileController)

module.exports = router;