const mongoose = require('mongoose');
const connectDB=async()=>{
try {
    const MONGO_URL=process.env.MONGO_URL;
    await mongoose.connect(MONGO_URL, {
        useNewUrlParser: true, 
      });
      console.log('MongoDB connected successfully!');
} catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
}
}
module.exports={connectDB}