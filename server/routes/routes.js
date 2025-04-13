const Router=require('express');
const {handleUserSignUp,handleUserSignIn, getUserInfo}=require("../controllers/userController");
const {authenticateAdmin}=require('../middlewares/auth');
const router=Router();
router.post('/signUp',handleUserSignUp)
router.post('/signIn',handleUserSignIn);
router.get('/getuser',getUserInfo);
router.get('/admin/dashboard', authenticateAdmin, (req, res) => {
    res.status(200).json({
      success: true,
      message: 'Welcome to the admin dashboard!',
    });
  });

module.exports=router;