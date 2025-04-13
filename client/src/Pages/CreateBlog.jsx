import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
export default function CreateBlog() {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: ''
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
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
      setIsLoading(false);
      return;
    }
    
    try {
      const response = await fetch('http://localhost:8000/api/blogs/create', {
        method: 'POST',
        headers: {
              'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',

        
        },
        body: JSON.stringify(formData)
      });
      
      const data = await response.json();
      
      if (data.success) {
    
            toast.success(data.message|| 'Blog created successfully!');
        // Reset form after successful submission
        setFormData({
          title: '',
          content: '',
          category: ''
        });
        navigate('/blogs');
      } else {
        setError(data.message || 'Failed to create blog');
        toast.error(data.message || 'Failed to create blog');
      }
    } catch (err) {
        setError('An error occurred. Please try again later.');
        toast.error('An error occurred. Please try again later.');
        console.error(err);
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="max-w-4xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Create New Blog Post</h1>
      
      {error && (
        <div className="mb-4 p-4 bg-red-100 border-l-4 border-red-500 text-red-700 rounded">
          <p className="font-medium">Error</p>
          <p>{error}</p>
        </div>
      )}
      
      {success && (
        <div className="mb-4 p-4 bg-green-100 border-l-4 border-green-500 text-green-700 rounded">
          <p className="font-medium">Success</p>
          <p>{success}</p>
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
            onClick={() => setFormData({ title: '', content: '', category: '' })}
            className="px-6 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
          >
            {isLoading ? 'Publishing...' : 'Publish Blog'}
          </button>
        </div>
      </form>
    </div>
  );
}