import React from 'react';

const ShinyText = ({ children, style }) => {
  return (
    <h1 className="shiny-text" style={style}>
      {children}
    </h1>
  );
};

export default ShinyText;