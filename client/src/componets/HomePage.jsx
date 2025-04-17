import React from 'react';
import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 to-indigo-700 text-white">
        <div className="absolute inset-0 opacity-10">
          <svg width="100%" height="100%" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 relative">
          <div className="md:w-3/5">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Share Your Thoughts With The World
            </h1>
            <p className="text-lg md:text-xl mb-8 opacity-90">
              Bloggy is a modern platform where you can create, share, and discover blogs about 
              technology, programming, and digital innovation.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link 
                to="/signup" 
                className="px-6 py-3 bg-white text-blue-600 font-medium rounded-lg hover:bg-gray-100 transition-colors shadow-md"
              >
                Get Started for Free
              </Link>
              <Link 
                to="/blogs" 
                className="px-6 py-3 bg-blue-700 text-white font-medium rounded-lg hover:bg-blue-800 transition-colors border border-blue-500 shadow-md"
              >
                Explore Blogs
              </Link>
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-gray-50 to-transparent"></div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Why Choose Bloggy?</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We've built a platform that makes blogging simple, social, and rewarding.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="h-12 w-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center mb-4">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Easy Content Creation</h3>
              <p className="text-gray-600">
                Our intuitive editor makes it simple to write, format, and publish your blogs. No technical skills required.
              </p>
            </div>
            
            {/* Feature 2 */}
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="h-12 w-12 bg-green-100 text-green-600 rounded-lg flex items-center justify-center mb-4">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Find Your Community</h3>
              <p className="text-gray-600">
                Connect with like-minded readers and writers who share your interests and passion for technology.
              </p>
            </div>
            
            {/* Feature 3 */}
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="h-12 w-12 bg-purple-100 text-purple-600 rounded-lg flex items-center justify-center mb-4">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Secure & Private</h3>
              <p className="text-gray-600">
                Your content is safe with us. We prioritize data protection and give you full control over your blog's visibility.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Categories Section */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Explore Categories</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Discover blogs on various tech topics that match your interests.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {["Tech", "Programming", "Gaming", "Tech News", "Productivity", "Blockchain", "IoT", "Reviews"].map((category) => (
              <Link 
                key={category}
                to={`/blogs?category=${category}`}
                className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow text-center"
              >
                <h3 className="text-lg font-medium text-gray-900">{category}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-indigo-600 to-purple-700 text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Start Blogging?</h2>
          <p className="text-lg md:text-xl mb-8 opacity-90 max-w-3xl mx-auto">
            Join thousands of creators who are sharing their knowledge, insights, and experiences on Bloggy.
            It takes just a minute to create your account and start writing.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              to="/signup" 
              className="px-8 py-3 bg-white text-indigo-600 font-medium rounded-lg hover:bg-gray-100 transition-colors shadow-md"
            >
              Create Your Account
            </Link>
            <Link 
              to="/signin" 
              className="px-8 py-3 bg-transparent text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors border border-white"
            >
              Sign In
            </Link>
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">What Our Users Say</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Don't just take our word for it - hear from bloggers who've found success on our platform.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                  <span className="text-xl font-bold text-blue-600">S</span>
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold text-gray-900">Sarah Johnson</h4>
                  <p className="text-sm text-gray-600">Tech Writer</p>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "Bloggy has transformed how I share my programming tutorials. The editor is a dream to use, and I've connected with so many readers who appreciate my content."
              </p>
            </div>
            
            {/* Testimonial 2 */}
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                  <span className="text-xl font-bold text-green-600">M</span>
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold text-gray-900">Michael Chen</h4>
                  <p className="text-sm text-gray-600">Game Developer</p>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "As a game developer, I needed a clean platform to document my journey. Bloggy is perfect - simple to use yet powerful enough for all my technical writing needs."
              </p>
            </div>
            
            {/* Testimonial 3 */}
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center">
                  <span className="text-xl font-bold text-purple-600">A</span>
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold text-gray-900">Aisha Patel</h4>
                  <p className="text-sm text-gray-600">Product Manager</p>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "I've tried several blogging platforms, but Bloggy stands out with its focus on tech content and community. It's where I share all my product management insights now."
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-gray-600">
              Find answers to common questions about Bloggy.
            </p>
          </div>
          
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Is Bloggy free to use?</h3>
              <p className="text-gray-600">
                Yes, Bloggy is completely free for basic usage. Create an account, write blogs, and share them with the world at no cost.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">How do I get started?</h3>
              <p className="text-gray-600">
                Simply sign up for an account, verify your email, and you can immediately start creating your first blog post.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Can I edit my blogs after publishing?</h3>
              <p className="text-gray-600">
                Absolutely! You can edit your blogs anytime from your dashboard. All changes are saved and reflected immediately.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Who can read my blogs?</h3>
              <p className="text-gray-600">
                By default, all blogs are public and can be read by anyone. We're working on private blog options for future updates.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer CTA */}
      <section className="bg-blue-600 text-white py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">Join the Bloggy Community Today</h2>
          <Link 
            to="/signup" 
            className="px-8 py-3 bg-white text-blue-600 font-medium rounded-lg hover:bg-gray-100 transition-colors shadow-md inline-block"
          >
            Sign Up Now — It's Free!
          </Link>
        </div>
      </section>
    </div>
  );
}