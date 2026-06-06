import React, { useState } from 'react';
import { Card, Badge, ListGroup, Button, Form, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Sidebar = ({ tags, onTagClick, selectedTag, posts }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const popularPosts = [...posts]
    .sort((a, b) => b.views - a.views)
    .slice(0, 5);

  const recentPosts = [...posts]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 3000);
      // Here you would typically send to your backend
    }
  };

  return (
    <div>
      {/* Search Box */}
      <Card className="mb-4">
        <Card.Header>🔍 Search</Card.Header>
        <Card.Body>
          <Form>
            <Form.Group>
              <Form.Control
                type="text"
                placeholder="Search articles..."
                onChange={(e) => onTagClick && onTagClick(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Card.Body>
      </Card>

      {/* Tags Cloud */}
      {tags && tags.length > 0 && (
        <Card className="mb-4">
          <Card.Header>🏷️ Tags Cloud</Card.Header>
          <Card.Body>
            <div className="d-flex flex-wrap gap-2">
              <Badge 
                bg={!selectedTag ? 'primary' : 'secondary'}
                style={{ cursor: 'pointer', fontSize: '0.9rem' }}
                onClick={() => onTagClick && onTagClick('')}
              >
                All
              </Badge>
              {tags.map(tag => (
                <Badge 
                  key={tag}
                  bg={selectedTag === tag ? 'primary' : 'secondary'}
                  style={{ cursor: 'pointer', fontSize: '0.8rem' }}
                  onClick={() => onTagClick && onTagClick(tag)}
                >
                  #{tag}
                </Badge>
              ))}
            </div>
          </Card.Body>
        </Card>
      )}

      {/* Popular Posts */}
      {popularPosts.length > 0 && (
        <Card className="mb-4">
          <Card.Header>🔥 Popular Posts</Card.Header>
          <ListGroup variant="flush">
            {popularPosts.map(post => (
              <ListGroup.Item key={post.id} action as={Link} to={`/post/${post.id}`}>
                <div>
                  <strong>{post.title}</strong>
                  <div>
                    <small className="text-muted">
                      👁️ {post.views} views
                    </small>
                  </div>
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Card>
      )}

      {/* Recent Posts */}
      {recentPosts.length > 0 && (
        <Card className="mb-4">
          <Card.Header>🕒 Recent Posts</Card.Header>
          <ListGroup variant="flush">
            {recentPosts.map(post => (
              <ListGroup.Item key={post.id} action as={Link} to={`/post/${post.id}`}>
                <div>
                  {post.title}
                  <div>
                    <small className="text-muted">
                      {new Date(post.createdAt).toLocaleDateString()}
                    </small>
                  </div>
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Card>
      )}

      {/* Newsletter Subscription */}
      <Card className="mb-4 bg-light">
        <Card.Header>📧 Newsletter</Card.Header>
        <Card.Body>
          {subscribed && (
            <Alert variant="success" className="p-2">
              Subscribed successfully!
            </Alert>
          )}
          <Form onSubmit={handleSubscribe}>
            <Form.Group className="mb-3">
              <Form.Label>Get latest posts</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit" size="sm" block>
              Subscribe
            </Button>
          </Form>
        </Card.Body>
      </Card>

      {/* Stats */}
      <Card>
        <Card.Header>📊 Blog Stats</Card.Header>
        <Card.Body>
          <div className="text-center">
            <h4>{posts.filter(p => p.status === 'published').length}</h4>
            <small className="text-muted">Total Posts</small>
            <hr />
            <h4>{posts.reduce((sum, p) => sum + p.views, 0)}</h4>
            <small className="text-muted">Total Views</small>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Sidebar;