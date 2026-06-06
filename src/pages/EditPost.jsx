import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Alert, Button } from 'react-bootstrap'; // Added Button here
import { useBlog } from '../context/BlogContext';
import Editor from '../components/Editor/Editor';

const EditPost = () => {
  const { id } = useParams();
  const { posts, updatePost } = useBlog();
  const navigate = useNavigate();
  const post = posts.find(p => p.id === id);

  const handleSubmit = (updatedData) => {
    updatePost(id, updatedData);
    navigate('/dashboard');
  };

  if (!post) {
    return (
      <Container className="mt-5">
        <Alert variant="danger">
          <h4>Post not found</h4>
          <p>The post you're trying to edit doesn't exist.</p>
          <Button variant="primary" onClick={() => navigate('/dashboard')}>
            Back to Dashboard
          </Button>
        </Alert>
      </Container>
    );
  }

  return (
    <Container>
      <Row>
        <Col lg={10} className="mx-auto">
          <h2 className="mb-4">Edit Post</h2>
          <Editor initialData={post} onSubmit={handleSubmit} isEditing={true} />
        </Col>
      </Row>
    </Container>
  );
};

export default EditPost;