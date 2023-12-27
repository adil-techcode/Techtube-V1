import React from 'react';

const Footer = () => {
  const style = {
    position: 'fixed',
    bottom: '0',
    width: '100%',
    backgroundColor: '#f8f9fa',
    textAlign: 'center',
  };

  return (
    <footer style={style}>
      <p className='text-center py-2 mb-0'>&copy; 2023 TechTube | All rights reserved</p>
    </footer>
  );
};

export default Footer;

