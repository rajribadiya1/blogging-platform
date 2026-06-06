import React, { useState } from 'react';
import { Navbar, Nav, Container, Button, NavDropdown, Badge } from 'react-bootstrap';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [expanded, setExpanded] = useState(false);

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <Navbar 
      bg="dark" 
      variant="dark" 
      expand="lg" 
      sticky="top"
      expanded={expanded}
      onToggle={() => setExpanded(!expanded)}
    >
      <Container>
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
          <span style={{ fontSize: '1.5rem', marginRight: '8px' }}>📝</span>
          <strong>BlogCMS</strong>
          <Badge bg="info" className="ms-2" style={{ fontSize: '0.7rem' }}>
            v1.0
          </Badge>
        </Navbar.Brand>
        
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link 
              as={Link} 
              to="/" 
              active={isActive('/')}
              onClick={() => setExpanded(false)}
            >
              🏠 Home
            </Nav.Link>
            
            <Nav.Link 
              as={Link} 
              to="/dashboard" 
              active={isActive('/dashboard')}
              onClick={() => setExpanded(false)}
            >
              📊 Dashboard
            </Nav.Link>
            
            <NavDropdown title="📚 Resources" id="basic-nav-dropdown">
              <NavDropdown.Item href="#markdown-guide">
                Markdown Guide
              </NavDropdown.Item>
              <NavDropdown.Item href="#writing-tips">
                Writing Tips
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#about">
                About
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          
          <div className="d-flex gap-2">
            <Button 
              variant="outline-info" 
              onClick={() => navigate('/dashboard')}
              size="sm"
            >
              📋 My Posts
            </Button>
            
            <Button 
              variant="primary" 
              onClick={() => {
                navigate('/create');
                setExpanded(false);
              }}
            >
              ✨ Write New Post
            </Button>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;