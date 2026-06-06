import React, { useState } from 'react';
import { Form, Button, Card, Badge, Alert } from 'react-bootstrap';
import SimpleMDE from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css';

const Editor = ({ initialData, onSubmit, isEditing }) => {
  const [title, setTitle] = useState(initialData?.title || '');
  const [content, setContent] = useState(initialData?.content || '');
  const [summary, setSummary] = useState(initialData?.summary || '');
  const [tags, setTags] = useState(initialData?.tags?.join(', ') || '');
  const [status, setStatus] = useState(initialData?.status || 'draft');
  const [saving, setSaving] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const tagArray = tags.split(',').map(tag => tag.trim().toLowerCase());
    
    onSubmit({
      title,
      content,
      summary,
      tags: tagArray,
      status,
      author: 'Current User' // In real app, get from auth
    });
  };

  const saveAsDraft = () => {
    setStatus('draft');
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
  };

  const editorOptions = {
    autofocus: true,
    spellChecker: false,
    placeholder: "Write your blog post here... Support Markdown!",
    toolbar: [
      "heading", "bold", "italic", "strikethrough", "|",
      "quote", "code", "unordered-list", "ordered-list", "|",
      "link", "image", "table", "horizontal-rule", "|",
      "preview", "side-by-side", "fullscreen", "|",
      "guide"
    ]
  };

  return (
    <Card>
      <Card.Body>
        <Form onSubmit={handleSubmit}>
          {showAlert && (
            <Alert variant="success" onClose={() => setShowAlert(false)} dismissible>
              Draft saved successfully!
            </Alert>
          )}
          
          <Form.Group className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter post title"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Summary</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              placeholder="Brief summary of your post"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Content (Markdown Supported)</Form.Label>
            <SimpleMDE
              value={content}
              onChange={setContent}
              options={editorOptions}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Tags (comma-separated)</Form.Label>
            <Form.Control
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="react, javascript, webdev"
            />
            <Form.Text className="text-muted">
              Separate tags with commas
            </Form.Text>
          </Form.Group>

          <div className="d-flex gap-2">
            <Button variant="primary" type="submit">
              {isEditing ? 'Update Post' : 'Publish Post'}
            </Button>
            {!isEditing && (
              <Button variant="secondary" onClick={saveAsDraft}>
                Save as Draft
              </Button>
            )}
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default Editor;