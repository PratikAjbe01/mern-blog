

// App.js (example of how to set up the router)
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SignUp from './Pages/SignUp';
import SignIn from './Pages/SignIn';
import BlogsPage from './Pages/BlogPage';
import BlogDetailPage from './Pages/BlogDetailPage';
import Publish from './Pages/Publish';
import UserBoard from './Pages/UserBoard';


// Import other components like Dashboard, etc.

function App() {
  return (
    <Router>
      <ToastContainer 
        position="bottom-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Routes>
        <Route path="/" element={<SignUp/>} />
        <Route path="/signin" element={<SignIn/>} />
        <Route path="/blogs" element={<BlogsPage/>} />
        <Route path="/blogs/:id" element={<BlogDetailPage/>} />
        <Route path='/create' element={<Publish/>} />
        <Route path='/user'  element={<UserBoard/>} />
      </Routes>
    </Router>
  );
}

export default App;