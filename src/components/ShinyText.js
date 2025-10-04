import React from 'react';
import styled from 'styled-components';

const ShinyTextContainer = styled.span`
  display: inline-block;
  background: linear-gradient(90deg, #ffffff 0%, #ffffff 20%, #cccccc 50%, #ffffff 80%, #ffffff 100%);
  background-size: 200% auto;
  color: transparent;
  -webkit-background-clip: text;
  background-clip: text;
  animation: shine ${({ speedInMs }) => speedInMs / 1000}s linear infinite;

  @keyframes shine {
    to {
      background-position: 200% center;
    }
  }
`;

const ShinyText = ({ children, speedInMs = 3000, className, style }) => {
  return (
    <ShinyTextContainer speedInMs={speedInMs} className={className} style={style}>
      {children}
    </ShinyTextContainer>
  );
};

export default ShinyText;