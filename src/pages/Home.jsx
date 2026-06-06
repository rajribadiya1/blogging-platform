import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Button, Badge, Form, InputGroup, Pagination, Container } from 'react-bootstrap'; // Added Container
import { Link } from 'react-router-dom';
import { useBlog } from '../context/BlogContext';
import Sidebar from '../components/Sidebar/Sidebar';

const Home = () => {
  const { posts } = useBlog();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 5;

  const publishedPosts = posts.filter(post => post.status === 'published');
  
  const allTags = [...new Set(publishedPosts.flatMap(post => post.tags))];

  const filteredPosts = publishedPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.summary.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTag = !selectedTag || post.tags.includes(selectedTag);
    return matchesSearch && matchesTag;
  });

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedTag]);

  return (
    <Container>
      <Row>
        <Col lg={8}>
          <div className="mb-4">
            <h1 className="display-5">Welcome to BlogCMS</h1>
            <p className="lead">Discover amazing articles and insights from our community</p>
          </div>

          <InputGroup className="mb-4">
            <Form.Control
              placeholder="Search posts by title, content, or tags..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              size="lg"
            />
            <Button variant="outline-secondary" size="lg">
              🔍 Search
            </Button>
          </InputGroup>

          {selectedTag && (
            <div className="mb-3">
              <Badge bg="primary" className="p-2">
                Filtering by: #{selectedTag}
                <Button 
                  variant="link" 
                  size="sm" 
                  className="text-white ms-2" 
                  onClick={() => setSelectedTag('')}
                  style={{ textDecoration: 'none' }}
                >
                  ✕
                </Button>
              </Badge>
            </div>
          )}

          {currentPosts.length === 0 ? (
            <Card className="text-center p-5">
              <Card.Body>
                <h3>No posts found</h3>
                <p className="text-muted">Try adjusting your search or filters</p>
                <Button variant="primary" onClick={() => {
                  setSearchTerm('');
                  setSelectedTag('');
                }}>
                  Clear Filters
                </Button>
              </Card.Body>
            </Card>
          ) : (
            <>
              {currentPosts.map(post => (
                <Card key={post.id} className="mb-4 shadow-sm">
                  <Card.Body>
                    <Card.Title as="h3">
                      <Link to={`/post/${post.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                        {post.title}
                      </Link>
                    </Card.Title>
                    
                    <Card.Subtitle className="mb-2 text-muted">
                      By <strong>{post.author}</strong> • 
                      {new Date(post.createdAt).toLocaleDateString()} • 
                      <span className="ms-1">👁️ {post.views} views</span>
                    </Card.Subtitle>
                    
                    <Card.Text className="mt-3">{post.summary}</Card.Text>
                    
                    <div className="mb-3">
                      {post.tags.map(tag => (
                        <Badge 
                          key={tag} 
                          bg="secondary" 
                          className="me-1"
                          style={{ cursor: 'pointer' }}
                          onClick={() => setSelectedTag(tag)}
                        >
                          #{tag}
                        </Badge>
                      ))}
                    </div>
                    
                    <Button as={Link} to={`/post/${post.id}`} variant="primary">
                      Read More →
                    </Button>
                  </Card.Body>
                </Card>
              ))}

              {totalPages > 1 && (
                <Pagination className="justify-content-center">
                  <Pagination.First onClick={() => paginate(1)} disabled={currentPage === 1} />
                  <Pagination.Prev onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1} />
                  
                  {[...Array(totalPages).keys()].map(number => (
                    <Pagination.Item 
                      key={number + 1} 
                      active={number + 1 === currentPage}
                      onClick={() => paginate(number + 1)}
                    >
                      {number + 1}
                    </Pagination.Item>
                  ))}
                  
                  <Pagination.Next onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages} />
                  <Pagination.Last onClick={() => paginate(totalPages)} disabled={currentPage === totalPages} />
                </Pagination>
              )}
            </>
          )}
        </Col>

        <Col lg={4}>
          <Sidebar 
            tags={allTags}
            onTagClick={setSelectedTag}
            selectedTag={selectedTag}
            posts={publishedPosts}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default Home;