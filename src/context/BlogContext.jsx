import React, { createContext, useState, useContext, useEffect } from 'react';

const BlogContext = createContext();

export const useBlog = () => useContext(BlogContext);

export const BlogProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [tags, setTags] = useState([]);
  const [comments, setComments] = useState({});

  // Load data from localStorage
  useEffect(() => {
    const savedPosts = localStorage.getItem('blog_posts');
    const savedComments = localStorage.getItem('blog_comments');
    
    if (savedPosts) setPosts(JSON.parse(savedPosts));
    if (savedComments) setComments(JSON.parse(savedComments));
    
    // Sample data if empty
    if (!savedPosts) {
      const samplePosts = [
        {
          id: '1',
          title: 'Getting Started with React',
          content: 'React is a JavaScript library for building user interfaces...',
          summary: 'Learn the basics of React development',
          tags: ['react', 'javascript', 'webdev'],
          status: 'published',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          author: 'Admin',
          views: 150
        }
      ];
      setPosts(samplePosts);
      localStorage.setItem('blog_posts', JSON.stringify(samplePosts));
    }
  }, []);

  // Save posts to localStorage
  useEffect(() => {
    if (posts.length > 0) {
      localStorage.setItem('blog_posts', JSON.stringify(posts));
    }
  }, [posts]);

  // Save comments to localStorage
  useEffect(() => {
    localStorage.setItem('blog_comments', JSON.stringify(comments));
  }, [comments]);

  const createPost = (post) => {
    const newPost = {
      ...post,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      views: 0
    };
    setPosts([newPost, ...posts]);
    updateTags(newPost.tags);
    return newPost;
  };

  const updatePost = (id, updatedPost) => {
    setPosts(posts.map(post => 
      post.id === id ? { ...updatedPost, updatedAt: new Date().toISOString() } : post
    ));
    updateTags(updatedPost.tags);
  };

  const deletePost = (id) => {
    setPosts(posts.filter(post => post.id !== id));
    delete comments[id];
    setComments({ ...comments });
  };

  const updateTags = (newTags) => {
    const allTags = [...new Set([...tags, ...newTags])];
    setTags(allTags);
  };

  const addComment = (postId, comment) => {
    const newComment = {
      id: Date.now().toString(),
      ...comment,
      createdAt: new Date().toISOString()
    };
    setComments({
      ...comments,
      [postId]: [...(comments[postId] || []), newComment]
    });
  };

  const incrementViews = (postId) => {
    setPosts(posts.map(post =>
      post.id === postId ? { ...post, views: post.views + 1 } : post
    ));
  };

  return (
    <BlogContext.Provider value={{
      posts,
      tags,
      comments,
      createPost,
      updatePost,
      deletePost,
      addComment,
      incrementViews
    }}>
      {children}
    </BlogContext.Provider>
  );
};