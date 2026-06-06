import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, Button, Badge } from 'react-bootstrap';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useBlog } from '../context/BlogContext';
import CommentSection from '../components/CommentSection/CommentSection';
import SocialShare from '../components/SocialShare/SocialShare';

const Post = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { posts, comments, addComment, incrementViews } = useBlog();
  const post = posts.find(p => p.id === id);

  useEffect(() => {
    if (post && post.status === 'published') {
      incrementViews(id);
    }
  }, [id, post, incrementViews]);

  if (!post) {
    return (
      <Card>
        <Card.Body>
          <h3>Post not found</h3>
          <Button onClick={() => navigate('/')}>Back to Home</Button>
        </Card.Body>
      </Card>
    );
  }

  if (post.status === 'draft') {
    return (
      <Card>
        <Card.Body>
          <h3>This post is a draft</h3>
          <p>Only you can see this.</p>
          <Button onClick={() => navigate('/dashboard')}>Back to Dashboard</Button>
        </Card.Body>
      </Card>
    );
  }

  return (
    <div>
      <Card>
        <Card.Body>
          <Card.Title as="h1">{post.title}</Card.Title>
          <Card.Subtitle className="mb-3 text-muted">
            By {post.author} • {new Date(post.createdAt).toLocaleDateString()} • 
            {post.views} views • Last updated: {new Date(post.updatedAt).toLocaleDateString()}
          </Card.Subtitle>
          
          <div className="mb-3">
            {post.tags.map(tag => (
              <Badge key={tag} bg="secondary" className="me-1">
                #{tag}
              </Badge>
            ))}
          </div>

          <SocialShare title={post.title} url={`/post/${id}`} />

          <div className="blog-content">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {post.content}
            </ReactMarkdown>
          </div>
        </Card.Body>
      </Card>

      <CommentSection 
        postId={id}
        comments={comments[id] || []}
        onAddComment={addComment}
      />
    </div>
  );
};

export default Post;