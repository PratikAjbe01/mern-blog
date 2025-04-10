const jwt = require('jsonwebtoken');
const { User } = require('../models/userModel'); // Import User model

const authenticateUser = async (req, res, next) => {
  try {
    // Get the token from the 'Authorization' header
    const token = req.headers.authorization?.split(' ')[1];  // Format: Bearer <token>

    // If no token is provided, return an error
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Authorization token is required',
      });
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Use JWT_SECRET from .env file

    // Find the user associated with the decoded user ID
    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    // Attach the user to the request object (so it can be accessed in the protected routes)
    req.userId = decoded.userId;
    // Allow the request to proceed to the next middleware/route handler
    next();
  } catch (error) {
    // If token is invalid or expired, return an error
    return res.status(401).json({
      success: false,
      message: 'Invalid or expired token',
    });
  }
};

const authenticateAdmin = async (req, res, next) => {
  try {
    // Get the token from the 'Authorization' header
    const token = req.headers.authorization?.split(' ')[1];  // Format: Bearer <token>

    // If no token is provided, return an error
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Authorization token is required',
      });
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Use JWT_SECRET from .env file

    // Find the user associated with the decoded user ID
    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }
    if (user.role !== 'ADMIN') {
      return res.status(403).json({ success: false, message: 'Access denied. Admins only.' });
    }

    // Attach the user to the request object (so it can be accessed in the protected routes)
    req.userId = decoded.userId;
    // Allow the request to proceed to the next middleware/route handler
    next();
  } catch (error) {
    // If token is invalid or expired, return an error
    return res.status(401).json({
      success: false,
      message: 'Invalid or expired token',
    });
  }
};
module.exports = {authenticateUser, authenticateAdmin};
