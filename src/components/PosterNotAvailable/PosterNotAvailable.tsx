import React from 'react';
import styled from 'styled-components';

const PosterNotAvailable = () => (
  <Container>
    Poster Not Available
  </Container>
);

export default PosterNotAvailable;

const Container = styled.div`
  width: 100px;
  height: 100px;
  background-color: #C4C4C4;
  text-align: center;

  display: flex;
  align-items: center;
  justify-content: center;
`;
