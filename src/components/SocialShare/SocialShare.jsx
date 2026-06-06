import React, { useState } from 'react';
import { ButtonGroup, Button, Tooltip, OverlayTrigger, Alert } from 'react-bootstrap';

const SocialShare = ({ title, url }) => {
  const [showAlert, setShowAlert] = useState(false);
  const fullUrl = window.location.origin + url;
  const encodedUrl = encodeURIComponent(fullUrl);
  const encodedTitle = encodeURIComponent(title);

  const shareButtons = [
    { 
      name: 'Twitter', 
      color: '#1da1f2', 
      icon: '🐦',
      shareUrl: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`
    },
    { 
      name: 'Facebook', 
      color: '#1877f2', 
      icon: '📘',
      shareUrl: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`
    },
    { 
      name: 'LinkedIn', 
      color: '#0077b5', 
      icon: '🔗',
      shareUrl: `https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}`
    },
    { 
      name: 'WhatsApp', 
      color: '#25d366', 
      icon: '💬',
      shareUrl: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`
    },
    { 
      name: 'Reddit', 
      color: '#ff4500', 
      icon: '📎',
      shareUrl: `https://reddit.com/submit?url=${encodedUrl}&title=${encodedTitle}`
    }
  ];

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(fullUrl);
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleShare = (shareUrl) => {
    window.open(shareUrl, '_blank', 'width=600,height=400');
  };

  const renderTooltip = (name) => (props) => (
    <Tooltip id={`tooltip-${name}`} {...props}>
      Share on {name}
    </Tooltip>
  );

  // Web Share API for mobile devices
  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          text: 'Check out this article!',
          url: fullUrl,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      copyToClipboard();
    }
  };

  return (
    <div className="social-share my-3">
      {showAlert && (
        <Alert variant="success" className="mb-2" onClose={() => setShowAlert(false)} dismissible>
          Link copied to clipboard!
        </Alert>
      )}
      
      <h6>Share this post:</h6>
      <div className="d-flex flex-wrap gap-2">
        {shareButtons.map(({ name, color, icon, shareUrl }) => (
          <OverlayTrigger
            key={name}
            placement="top"
            overlay={renderTooltip(name)}
          >
            <Button
              variant="light"
              style={{ backgroundColor: color, color: 'white', border: 'none' }}
              onClick={() => handleShare(shareUrl)}
              className="d-flex align-items-center gap-1"
            >
              <span>{icon}</span>
              <span>{name}</span>
            </Button>
          </OverlayTrigger>
        ))}
        
        <OverlayTrigger placement="top" overlay={renderTooltip('Copy Link')}>
          <Button
            variant="secondary"
            onClick={copyToClipboard}
            className="d-flex align-items-center gap-1"
          >
            <span>🔗</span>
            <span>Copy Link</span>
          </Button>
        </OverlayTrigger>

        {navigator.share && (
          <OverlayTrigger placement="top" overlay={renderTooltip('Share')}>
            <Button
              variant="info"
              onClick={handleNativeShare}
              className="d-flex align-items-center gap-1"
            >
              <span>📱</span>
              <span>Share</span>
            </Button>
          </OverlayTrigger>
        )}
      </div>
    </div>
  );
};

export default SocialShare;