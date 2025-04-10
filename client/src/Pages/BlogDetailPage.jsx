// BlogDetailPage.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const BlogDetailPage = () => {
  const [blog, setBlog] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogDetail = async () => {
      setIsLoading(true);
      try {
        const token = localStorage.getItem('token');
        
        if (!token) {
          toast.error('You must be logged in to view this blog');
          navigate('/signin');
          return;
        }

        const response = await fetch(`http://localhost:8000/api/blogs/specific/${id}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || 'Failed to fetch blog');
        }

        setBlog(data.data);
      } catch (error) {
        setError(error.message);
        toast.error(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchBlogDetail();
    }
  }, [id, navigate]);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex justify-center items-center px-4 py-8">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-lg">
            <p className="font-bold">Error</p>
            <p>{error}</p>
            <button 
              onClick={() => navigate('/blogs')}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Back to Blogs
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen bg-gray-50 px-4 py-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-gray-800">Blog not found</h2>
          <p className="text-gray-600 mt-2">The blog you're looking for doesn't exist or has been removed.</p>
          <button 
            onClick={() => navigate('/blogs')}
            className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Back to Blogs
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="max-w-3xl mx-auto">
        {/* Back button */}
        <button 
          onClick={() => navigate('/blogs')}
          className="mb-6 flex items-center text-blue-600 hover:text-blue-800"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
          </svg>
          Back to Blogs
        </button>

        {/* Blog header */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
          {blog.coverImage && (
            <img 
              src={blog.coverImage} 
              alt={blog.title} 
              className="w-full h-64 object-cover"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = '/api/placeholder/800/400';
              }}
            />
          )}
          
          <div className="p-6 sm:p-8">
            <div className="flex flex-wrap justify-between items-center mb-4">
              <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full mb-2 sm:mb-0">
                {blog.category}
              </span>
              <span className="text-sm text-gray-600">
                Published on {formatDate(blog.createdAt)}
                {blog.updatedAt !== blog.createdAt && 
                  ` · Updated on ${formatDate(blog.updatedAt)}`
                }
              </span>
            </div>
            
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">
              {blog.title}
            </h1>
            
            {blog.userId && (
              <div className="flex items-center mb-6">
                <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center mr-3">
                  {blog.userId.profileImage ? (
                    <img 
                      src={blog.userId.profileImage} 
                      alt={blog.userId.fullName} 
                      className="h-10 w-10 rounded-full"
                    />
                  ) : (
                    <span className="text-lg font-bold text-gray-600">
                      {blog.userId.fullName?.charAt(0) || 'U'}
                    </span>
                  )}
                </div>
                <div>
                  <p className="font-medium text-gray-800">
                    {blog.userId.fullName || 'Anonymous'}
                  </p>
                  {blog.userId.bio && (
                    <p className="text-sm text-gray-600">{blog.userId.bio}</p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Blog content */}
        <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 mb-8">
          <div className="prose max-w-none">
            {/* Using pre-wrap to preserve whitespace and line breaks */}
            <div style={{ whiteSpace: 'pre-wrap' }}>
              {blog.content}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetailPage;

