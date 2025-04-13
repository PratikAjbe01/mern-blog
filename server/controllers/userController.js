const { User } = require("../models/userModel");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const handleUserSignUp=async(req,res)=>{
try {
    const {fullName,email,password,role}=req.body;
const user=await User.findOne({email});
if(user){
    return res.status(400).json({
        success:false,
        message:'user already present with this email'
});
}
const newUser = new User({
    fullName,
    email,
    password,
    role,
  });
  await newUser.save();
  return res.status(201).json({
    success: true,
    message: 'User successfully created!',
    data: { id: newUser._id, fullName: newUser.fullName, email: newUser.email },
  });
    
} catch (error) {
    return res.json({success:false,message:error});
}

}


const handleUserSignIn = async (req, res) => {
  try {
    const { email, password } = req.body;


    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'Invalid email or password.',
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({
        success: false,
        message: 'Invalid email or password.',
      });
    }


    const payload = {
      userId: user._id,
      role: user.role,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.cookie('token', token, {
        httpOnly: true,  // This prevents JavaScript access to the cookie (increases security)
        secure: process.env.NODE_ENV === 'production',  // Set to true in production (ensures HTTPS)
        maxAge: 3600000,  // Token expiration time (1 hour)
      });

    return res.status(200).json({
      success: true,
      message: 'Successfully signed in!',
      token,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
const getUserInfo=async(req,res)=>{
  try {
       const token = req.headers.authorization?.split(' ')[1];  
    
        
        if (!token) {
          return res.status(401).json({
            success: false,
            message: 'Authorization token is required',
          });
        }
    
      
        const decoded = jwt.verify(token, process.env.JWT_SECRET); 
    
    
        const user = await User.findById(decoded.userId);
        if (!user) {
          return res.status(404).json({
            success: false,
            message: 'User not found',
          });
        }
        return res.status(201).json({
          success: true,
          message: 'User found',
          data:user,
        });
    
       
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

module.exports = { handleUserSignUp,handleUserSignIn ,getUserInfo};
