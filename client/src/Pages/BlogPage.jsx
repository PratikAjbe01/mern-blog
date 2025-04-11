import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const BlogsPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogs = async () => {
      setIsLoading(true);
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          toast.error('You must be logged in to view blogs');
          navigate('/signin');
          return;
        }

        const response = await fetch('http://localhost:8000/api/blogs/allBlogs', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || 'Failed to fetch blogs');
        }

        setBlogs(data.data);
        console.log(data.data);
        
        toast.success(data.message);
      } catch (error) {
        setError(error.message);
        toast.error(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlogs();
  }, [navigate]);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const createExcerpt = (content, maxLength = 120) => {
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength) + '...';
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">All Blogs</h1>
          <p className="text-gray-600 mt-2">Discover interesting articles and insights</p>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-600"></div>
          </div>
        ) : error ? (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-lg mb-6">
            <p className="font-bold">Error</p>
            <p>{error}</p>
          </div>
        ) : blogs.length === 0 ? (
          <div className="text-center py-12">
            <h2 className="text-xl text-gray-700">No blogs found</h2>
            <p className="text-gray-600 mt-2">Check back later for new content</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs.map((blog) => (
              <div key={blog._id} className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform duration-300 hover:-translate-y-1">
                <div className="p-6">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">
                      {blog.category || 'Uncategorized'}
                    </span>
                    <span className="text-xs text-gray-500">
                      {blog.createdAt ? formatDate(blog.createdAt) : 'No date'}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-gray-800 mb-2">{blog.title}</h3>

                  <p className="text-gray-600 mb-4">
                    {blog.content ? createExcerpt(blog.content) : 'No content available'}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center mr-2">
                        <span className="text-xs font-bold text-gray-600">
                          {blog.userId ? blog.userId.fullName.toString().charAt(0).toUpperCase() : 'U'}
                        </span>
                      </div>
                      <span className="text-sm font-medium text-gray-700">
                        {blog.userId ? blog.userId.fullName.toString().substring(0, 6) + '...' : 'Unknown User'}
                      </span>
                    </div>
                    <button 
                      onClick={() => navigate(`/blogs/${blog._id}`)}
                      className="px-3 py-1 text-sm text-blue-600 font-medium hover:text-blue-800 transition-colors"
                    >
                      Read More
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogsPage;
