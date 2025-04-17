import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function EditBlog() {
  const { blogId } = useParams();
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: ''
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState('');
  
  const navigate = useNavigate();
  const categories = [
    "Tech",
    "Programming",
    "Gaming",
    "Tech News",
    "Productivity",
    "Blockchain",
    "IoT",
    "Reviews",
    "Tutorials",
    "Career",
    "Business",
    "Health Tech",
    "Sports",
    "Entertainment"
  ];
  
  useEffect(() => {
    const fetchBlogData = async () => {
      setIsFetching(true);
      try {
        const token = localStorage.getItem('token');
        
        if (!token) {
          toast.error('You must be logged in to edit this blog');
          navigate('/signin');
          return;
        }
        
        // Using the specific endpoint from the reference code
        const response = await fetch(`http://localhost:8000/api/blogs/specific/${blogId}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        
        const data = await response.json();
        
        if (!response.ok) {
          throw new Error(data.message || 'Failed to fetch blog data');
        }
        
        // Set form data from the fetched blog
        setFormData({
          title: data.data.title,
          content: data.data.content,
          category: data.data.category
        });
      } catch (error) {
        setError(error.message);
        toast.error(error.message);
      } finally {
        setIsFetching(false);
      }
    };
    
    if (blogId) {
      fetchBlogData();
    }
  }, [blogId, navigate]);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleCategorySelect = (category) => {
    setFormData((prev) => ({
      ...prev,
      category
    }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    const token = localStorage.getItem('token');
    // Validate form
    if (!formData.title || !formData.content || !formData.category) {
      setError('All fields are required');
      toast.error('All fields are required');
      setIsLoading(false);
      return;
    }
    
    try {
      const response = await fetch(`http://localhost:8000/api/blogs/edit/${blogId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to update blog');
      }
      
      toast.success('Blog updated successfully!');
      navigate('/user');
    } catch (error) {
      setError(error.message);
      toast.error(error.message);
      console.error('Error updating blog:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  // Loading state UI
  if (isFetching) {
    return (
      <div className="min-h-screen bg-gray-50 flex justify-center items-center px-4 py-8">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }
  
  // Error state UI
  if (error && !formData.title) {
    return (
      <div className="min-h-screen bg-gray-50 px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-lg">
            <p className="font-bold">Error</p>
            <p>{error}</p>
            <button 
              onClick={() => navigate('/userboard')}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Back button */}
        <button 
          onClick={() => navigate('/userboard')}
          className="mb-6 flex items-center text-blue-600 hover:text-blue-800"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
          </svg>
          Back to Dashboard
        </button>
        
        <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Edit Blog Post</h1>
          
          {error && (
            <div className="mb-6 p-4 bg-red-100 border-l-4 border-red-500 text-red-700 rounded">
              <p className="font-medium">Error</p>
              <p>{error}</p>
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="title" className="block text-gray-700 font-medium mb-2">
                Blog Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter a descriptive title"
              />
            </div>
            
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Category <span className="text-red-500">*</span>
              </label>
              <div className="mb-2 text-sm text-gray-500">
                Select the most relevant category for your blog post
              </div>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    type="button"
                    onClick={() => handleCategorySelect(category)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors
                      ${formData.category === category 
                        ? 'bg-blue-500 text-white' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                  >
                    {category}
                  </button>
                ))}
              </div>
              {formData.category && (
                <p className="mt-2 text-sm text-blue-600">
                  Selected category: <span className="font-medium">{formData.category}</span>
                </p>
              )}
            </div>
            
            <div>
              <label htmlFor="content" className="block text-gray-700 font-medium mb-2">
                Content <span className="text-red-500">*</span>
              </label>
              <textarea
                id="content"
                name="content"
                value={formData.content}
                onChange={handleChange}
                rows="12"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Write your blog content here..."
              ></textarea>
            </div>
            
            <div className="flex items-center justify-between pt-4">
              <button
                type="button" 
                onClick={() => navigate('/userboard')}
                className="px-6 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
              >
                {isLoading ? 'Updating...' : 'Update Blog'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}