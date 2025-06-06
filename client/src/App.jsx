


import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SignUp from './Pages/SignUp';
import SignIn from './Pages/SignIn';
import BlogsPage from './Pages/BlogPage';
import BlogDetailPage from './Pages/BlogDetailPage';
import UserBoard from './Pages/UserBoard';
import CreateBlog from './Pages/CreateBlog';
import EditBlog from './Pages/EditBlog';
import Navbar from './componets/Navbar';
import HomePage from './componets/HomePage';




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
            <Navbar/>
      <Routes>
  
        <Route path="/" element={<SignUp/>} />
        <Route path="/signin" element={<SignIn/>} />
        <Route path="/blogs" element={<BlogsPage/>} />
        <Route path='/home' element={<HomePage/>} />
        <Route path="/blogs/:id" element={<BlogDetailPage/>} />
        <Route path='/create' element={<CreateBlog/>} />
        <Route path='/user'  element={<UserBoard/>} />
        <Route path="/editblog/:blogId" element={<EditBlog />} />
      </Routes>
    </Router>
  );
}

export default App;