const mongoose = require('mongoose');

// Blog schema definition
const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  content: {
    type: String,
    required: true
  },
  category: {
    type: String,
    enum: [
      "Tech",        // General tech-related content
      "Programming", // Focused on coding, languages, and development
      "Gaming", // Video games and game development
      "Tech News", // Latest tech updates, news, and innovations
      "Productivity", // Tools and tips for tech and business productivity
      "Blockchain", // Cryptocurrencies, NFTs, decentralized applications
      "IoT", // Internet of Things, smart devices, sensors
      "Reviews", // Product, software, hardware reviews
      "Tutorials", // How-to guides for various tech topics
      "Career", // Career advice for tech professionals
      "Business", // Tech and startup-related content
      "Health Tech", // Technology in healthcare, medical apps, devices
      "Sports",      // General sports-related content
      "Entertainment" // Movies, music, shows, and pop culture
    ],
    required:true
  }
,  
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',  // Reference to the User model
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Create a model from the schema
const Blog = mongoose.model('Blog', blogSchema);

module.exports = { Blog };
