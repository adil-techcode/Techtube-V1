import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  const containerStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',

  };

  const contentStyle = {
    textAlign: 'center',
    padding: '20px',
  };

  const headingStyle = {
    fontSize: '2em',
    marginBottom: '10px',
    color: '#721c24', 
  };

  const emojiStyle = {
    fontSize: '4em',
    marginBottom: '20px',
    display: 'block',
  };

  const messageStyle = {
    fontSize: '1.2em',
    color: '#721c24', // Set your desired text color
    marginTop: '10px',
  };

  return (
    <div style={containerStyle}>
      <div style={contentStyle}>
        <span role="img" aria-label="Sad Emoji" style={emojiStyle}>
          😢
        </span>
        <h1 style={headingStyle}>404 Not Found</h1>
        <p style={messageStyle}>The page you're looking for does not exist.</p>
        <Link to={"/"} > Go Home </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
