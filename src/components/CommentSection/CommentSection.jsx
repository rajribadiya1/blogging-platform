import React, { useState } from 'react';
import { Card, Form, Button, ListGroup, Alert } from 'react-bootstrap';

const CommentSection = ({ postId, comments = [], onAddComment }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && comment) {
      onAddComment(postId, { name, email, comment });
      setName('');
      setEmail('');
      setComment('');
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 3000);
    }
  };

  return (
    <Card className="mt-4">
      <Card.Header>
        <h5>Comments ({comments.length})</h5>
      </Card.Header>
      <Card.Body>
        {submitted && (
          <Alert variant="success">
            Comment added successfully!
          </Alert>
        )}
        
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Name *</Form.Label>
            <Form.Control
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Email (optional)</Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Comment *</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              required
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Post Comment
          </Button>
        </Form>

        {comments.length > 0 && (
          <ListGroup className="mt-4">
            {comments.map(comment => (
              <ListGroup.Item key={comment.id}>
                <div className="d-flex justify-content-between">
                  <strong>{comment.name}</strong>
                  <small className="text-muted">
                    {new Date(comment.createdAt).toLocaleDateString()}
                  </small>
                </div>
                <p className="mt-2 mb-0">{comment.comment}</p>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Card.Body>
    </Card>
  );
};

export default CommentSection;