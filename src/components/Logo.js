import React from 'react';

const Logo = (props) => {
  return (
    <img style={{ width: 40 }} alt="Logo" src="/static/logo.png" {...props} />
  );
};

export default Logo;
