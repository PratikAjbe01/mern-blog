import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import * as jwt_decode from 'jwt-decode';// You'll need to install this package

export default function UserBoard() {
  const [userBlogs, setUserBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [blogToDelete, setBlogToDelete] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is authenticated
    const token = localStorage.getItem('token');
    if (!token) {
      setError('You must be logged in to view your blogs');
      navigate('/signin'); // Redirect to sign in page
      return;
    }

    // Get user info from token
    getUserFromToken(token);
    // Fetch user blogs
    fetchUserBlogs(token);
  }, [navigate]);

  const getUserFromToken = (token) => {
    try {
      // Decode JWT token to get user information
      const decoded = jwt_decode.jwtDecode(token);
      
      // Set user data from token
    
      
      setUser({
        name: decoded.fullName || decoded.name || 'User',
        email: decoded.email || '',
        role: decoded.role || 'USER',
        // We don't have createdAt in the token, so we'll use current date as a fallback
        createdAt: new Date().toISOString()
      });
      
    } catch (error) {
      console.error('Error extracting user data from token:', error);
      setError('Unable to load user profile. Invalid token.');
      // If token is invalid, redirect to login
      navigate('/signin');
    }
  };

  const fetchUserBlogs = async (token) => {
    setLoading(true);
    try {
      console.log('Fetching blogs with token:', token.substring(0, 15) + '...');
      
      const response = await fetch('http://localhost:8000/api/blogs/myBlogs', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      // Check response status
      if (response.status === 401) {
        throw new Error('Authentication failed. Please log in again.');
      }
      
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json();
      
      if (data.success) {
        setUserBlogs(data.data);
      } else {
        // No blogs is a valid state, not an error
        setUserBlogs([]);
        console.log('No blogs found or', data.message);
      }
    } catch (error) {
      setError(`Error fetching your blogs: ${error.message}`);
      console.error('Error fetching blogs:', error);
      
      // If unauthorized, redirect to login
      if (error.message.includes('Authentication failed')) {
        localStorage.removeItem('token'); // Clear invalid token
        navigate('/signin');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (blogId) => {
    // Navigate to edit page
    navigate(`/edit-blog/${blogId}`);
  };

  const openDeleteModal = (blog) => {
    setBlogToDelete(blog);
    setDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setBlogToDelete(null);
    setDeleteModalOpen(false);
  };

  const handleDelete = async () => {
    if (!blogToDelete) return;
    const token = localStorage.getItem('token');
    
    try {
      const response = await fetch(`http://localhost:8000/api/blogs/${blogToDelete._id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json();
      
      if (data.success) {
        // Remove the deleted blog from state
        setUserBlogs(userBlogs.filter(blog => blog._id !== blogToDelete._id));
        closeDeleteModal();
      } else {
        setError(data.message || 'Failed to delete blog');
      }
    } catch (error) {
      setError(`Error deleting blog: ${error.message}`);
      console.error('Error deleting blog:', error);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* User Profile Section */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h1 className="text-3xl font-bold mb-6">My Profile</h1>
        
        {user ? (
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h2 className="text-xl font-semibold mb-4">Account Details</h2>
              <div className="space-y-3">
                <p><span className="font-medium">Name:</span> {user.name}</p>
                <p><span className="font-medium">Email:</span> {user.email}</p>
                <p><span className="font-medium">Member since:</span> {formatDate(user.createdAt)}</p>
              </div>
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-4">Stats</h2>
              <div className="space-y-3">
                <p><span className="font-medium">Total Blogs:</span> {userBlogs.length}</p>
                <p><span className="font-medium">Recent Activity:</span> {
                  userBlogs.length > 0 
                    ? `Last updated on ${formatDate(userBlogs.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))[0].updatedAt)}` 
                    : 'No activity yet'
                }</p>
              </div>
            </div>
          </div>
        ) : loading ? (
          <p>Loading profile information...</p>
        ) : (
          <p>Could not load profile information.</p>
        )}
      </div>

      {/* User Blogs Section */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">My Blogs</h2>
          <a 
            href="/create-blog" 
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
          >
            Create New Blog
          </a>
        </div>

        {error && (
          <div className="bg-red-100 text-red-700 p-4 rounded-md mb-6">
            {error}
          </div>
        )}

        {loading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600 mx-auto"></div>
            <p className="text-gray-500 mt-4">Loading your blogs...</p>
          </div>
        ) : userBlogs.length === 0 ? (
          <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-lg">
            <p className="text-gray-500 mb-4">You haven't created any blogs yet</p>
            <a 
              href="/create-blog" 
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
            >
              Write Your First Blog
            </a>
          </div>
        ) : (
          <div className="space-y-6">
            {userBlogs.map(blog => (
              <div key={blog._id} className="border rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-xl font-semibold">{blog.title}</h3>
                    <span className="inline-block bg-gray-100 text-gray-800 text-sm px-3 py-1 rounded-full mt-2">
                      {blog.category}
                    </span>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEdit(blog._id)}
                      className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => openDeleteModal(blog)}
                      className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                    >
                      Delete
                    </button>
                  </div>
                </div>
                
                <p className="text-gray-600 line-clamp-2 mb-3">
                  {blog.content.substring(0, 150)}
                  {blog.content.length > 150 ? '...' : ''}
                </p>
                
                <div className="flex justify-between text-sm text-gray-500">
                  <p>Created: {formatDate(blog.createdAt)}</p>
                  <p>Last updated: {formatDate(blog.updatedAt)}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {deleteModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className="text-xl font-bold mb-4">Delete Blog</h3>
            <p className="mb-6">
              Are you sure you want to delete "{blogToDelete?.title}"? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={closeDeleteModal}
                className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}