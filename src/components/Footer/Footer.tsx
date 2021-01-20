import React from 'react';
import styled from 'styled-components';

const Footer = () => (
  <FooterContainer>
    <p>Built with</p>
    <GithubContainer href="https://github.com/cameronshum/shopify-frontend-challenge-2021">
      Speed
    </GithubContainer>
    <p>by Cameron Shum</p>
  </FooterContainer>
);

export default React.memo(Footer);

const FooterContainer = styled.div`
  flex: 1;
  color: #bdbdbd;
  display: flex;
  align-items: flex-end;
  justify-content: center;
`;

const GithubContainer = styled.a`
  margin-left: 5px;
  margin-right: 5px;
`;
