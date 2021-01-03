import React from 'react';
import styled from 'styled-components';
import { Banner } from 'components';

const MainPage = () => (
  <Container>
    <Banner type="info" message="You have nominated 5 items." />
  </Container>
);

export default MainPage;

const Container = styled.div`
`;
