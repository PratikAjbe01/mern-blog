// blogRoutes.js
const express = require('express');
const { authenticateUser } = require('../middlewares/auth');  
const { createBlog, getUserBlogs, allBlogs, editBlog, deleteBlog, getBlog } = require('../controllers/blogController');  // Ensure this is correct

const router = express.Router();

router.post('/create', authenticateUser, createBlog);
router.get('/myBlogs', authenticateUser, getUserBlogs);
router.get('/allBlogs', authenticateUser, allBlogs);
router.put('/edit/:id', authenticateUser, editBlog);
router.delete('/delete/:id', authenticateUser, deleteBlog);
router.get('/specific/:id', authenticateUser, getBlog);

module.exports = router;
