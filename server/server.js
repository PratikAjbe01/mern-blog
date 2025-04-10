
const express=require("express")
require('dotenv').config(); 
const cors=require('cors');
const router = require('./routes/routes'); 
const blogRouter=require('./routes/blogRoutes'); // This will load variables from the .env file
const app=express();
const {connectDB}=require('./config/db')
const PORT=8000;
connectDB();
app.use(express.json());
const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'], // Optional, defaults to all common methods
  };
  
app.use(cors(corsOptions));
app.use('/api', router);
app.use('/api/blogs', blogRouter);

app.listen(PORT,()=>{
    console.log(`server working on Port:${PORT}`);
    
})