const { Blog } = require('../models/blogModel');



const createBlog = async (req, res) => {
  try {
    const { title, content, category } = req.body;

    if (!title || !content || !category) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    const newBlog = new Blog({
      title,
      content,
      category,
      userId: req.userId  // Automatically use the userId from the token
    });

    await newBlog.save();

    return res.status(201).json({
      success: true,
      message: "Blog created successfully!",
      data: newBlog
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to create blog",
      error: error.message
    });
  }
};
// Get all blogs for the authenticated user
const getUserBlogs = async (req, res) => {
  try {
    const userId = req.userId; // Ensure this is being populated properly

    if (!userId) {
      return res.status(400).json({ success: false, message: "User not authenticated" });
    }

    // Fetch the blogs for the authenticated user
    const blogs = await Blog.find({ userId });

    // If no blogs exist for the user
    if (blogs.length === 0) {
      return res.status(404).json({ success: false, message: "No blogs found" });
    }

    // Send the response with the blogs
    return res.status(200).json({
      success: true,
      message: "Blogs fetched successfully",
      data: blogs,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch blogs",
      error: error.message,
    });
  }
};
const allBlogs=async(req,res)=>{
    try {
        const blogs = await Blog.find();
        if(blogs.length===0){
            return res.status(404).json({ success: false, message: "No blogs found" });
        }
        return res.status(200).json({
            success: true,
            message: "Blogs fetched successfully",
            data: blogs,
            length:blogs.length
          });
        
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to fetch blogs",
            error: error.message,
          });
    }
}
const editBlog=async(req,res)=>{
try {
    const blogId=req.params.id
    const { title, content, category } = req.body;
    const blog = await Blog.findOne({_id:blogId});
    if(!blog){
        return res.status(404).json({ success: false, message: "No blogs found" });
    }
    blog.title = title || blog.title;
    blog.content = content || blog.content;
    blog.category = category || blog.category;

    await blog.save();
    return res.status(201).json({
        success: true,
        message: "Blog edited successfully!",
        data: blog
      });

} catch (error) {
    return res.status(500).json({
        success: false,
        message: "Failed to edit blogs",
        error: error.message,
      });
}
}
const deleteBlog=async(req,res)=>{
try {
    const blogId=req.params.id
    const blog = await Blog.findOne({_id:blogId});
    if(!blog){
        return res.status(404).json({ success: false, message: "No blogs found to delete" });
    }
    await blog.deleteOne({_id:blogId});
    return res.status(201).json({
        success: true,
        message: "Blog deleted successfully!",
        data: blog
      });

} catch (error) {
    return res.status(500).json({
        success: false,
        message: "Failed to edit blogs",
        error: error.message,
      });
}
}
const getBlog=async(req,res)=>{
 try {
  const blogId=req.params.id
  const blog = await Blog.findOne({ _id: blogId }).populate('userId', 'fullName profileImage bio');

  if(!blog){
    return res.status(404).json({ success: false, message: "error in getting blog with this id" });
}
return res.status(201).json({
  success: true,
  message: "Blog fetched successfully!",
  data: blog
});
 } catch (error) {
  return res.status(500).json({
    success: false,
    message: "Failed to fetch blogs with id ",
    error: error.message,
  });
 }
}

module.exports = { createBlog, getUserBlogs,allBlogs,editBlog,deleteBlog ,getBlog};
