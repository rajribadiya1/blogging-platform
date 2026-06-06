import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useBlog } from '../context/BlogContext';
import Editor from '../components/Editor/Editor';

const CreatePost = () => {
  const { createPost } = useBlog();
  const navigate = useNavigate();

  const handleSubmit = (postData) => {
    createPost(postData);
    navigate('/dashboard');
  };

  return (
    <div>
      <h2 className="mb-4">Create New Post</h2>
      <Editor onSubmit={handleSubmit} isEditing={false} />
    </div>
  );
};

export default CreatePost;