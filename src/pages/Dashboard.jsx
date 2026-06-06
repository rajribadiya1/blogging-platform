import React, { useState } from 'react';
import { Table, Button, Card, Badge, Modal, Alert, Row, Col, Container } from 'react-bootstrap'; // Added Button here
import { useBlog } from '../context/BlogContext';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const { posts, deletePost } = useBlog();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [postToDelete, setPostToDelete] = useState(null);
  const [showAlert, setShowAlert] = useState(false);

  const handleDelete = () => {
    deletePost(postToDelete.id);
    setShowDeleteModal(false);
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
  };

  const stats = {
    total: posts.length,
    published: posts.filter(p => p.status === 'published').length,
    drafts: posts.filter(p => p.status === 'draft').length,
    totalViews: posts.reduce((sum, p) => sum + p.views, 0)
  };

  return (
    <Container>
      {showAlert && (
        <Alert variant="success" dismissible onClose={() => setShowAlert(false)}>
          Post deleted successfully!
        </Alert>
      )}

      <h2 className="mb-4">Dashboard</h2>
      
      <Row className="mb-4">
        <Col md={3}>
          <Card className="text-center">
            <Card.Body>
              <h3>{stats.total}</h3>
              <Card.Text>Total Posts</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center">
            <Card.Body>
              <h3>{stats.published}</h3>
              <Card.Text>Published</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center">
            <Card.Body>
              <h3>{stats.drafts}</h3>
              <Card.Text>Drafts</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center">
            <Card.Body>
              <h3>{stats.totalViews}</h3>
              <Card.Text>Total Views</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Card>
        <Card.Header>
          <h5>All Posts</h5>
        </Card.Header>
        <Card.Body>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Title</th>
                <th>Status</th>
                <th>Tags</th>
                <th>Date</th>
                <th>Views</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {posts.map(post => (
                <tr key={post.id}>
                  <td>{post.title}</td>
                  <td>
                    <Badge bg={post.status === 'published' ? 'success' : 'warning'}>
                      {post.status}
                    </Badge>
                  </td>
                  <td>
                    {post.tags.slice(0, 2).map(tag => (
                      <Badge key={tag} bg="secondary" className="me-1">#{tag}</Badge>
                    ))}
                  </td>
                  <td>{new Date(post.createdAt).toLocaleDateString()}</td>
                  <td>{post.views}</td>
                  <td>
                    <Button 
                      as={Link} 
                      to={`/edit/${post.id}`} 
                      variant="info" 
                      size="sm" 
                      className="me-2"
                    >
                      Edit
                    </Button>
                    <Button 
                      variant="danger" 
                      size="sm"
                      onClick={() => {
                        setPostToDelete(post);
                        setShowDeleteModal(true);
                      }}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete "{postToDelete?.title}"?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Dashboard;