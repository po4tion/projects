import React from 'react';
import styled from 'styled-components';

const StyledFooterLink = styled.a`
  cursor: pointer;
  color: #fff;

  &:active {
    transform: scale(0.9);
  }
`;

function FooterLink({ children, href, target }) {
  return (
    <StyledFooterLink href={href} target={target}>
      {children}
    </StyledFooterLink>
  );
}

export default FooterLink;
