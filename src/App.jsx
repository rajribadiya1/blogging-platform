import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'easymde/dist/easymde.min.css';
import { BlogProvider } from './context/BlogContext';
import Header from './components/Header';
import Home from './pages/Home';
import Post from './pages/Post';
import CreatePost from './pages/CreatePost';
import Dashboard from './pages/Dashboard';
import EditPost from './pages/EditPost';

function App() {
  return (
    <BlogProvider>
      <Router>
        <Header />
        <div className="container mt-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/post/:id" element={<Post />} />
            <Route path="/create" element={<CreatePost />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/edit/:id" element={<EditPost />} />
          </Routes>
        </div>
      </Router>
    </BlogProvider>
  );
}

export default App;