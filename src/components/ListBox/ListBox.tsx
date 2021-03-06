import React, { useState } from 'react';
import isEqual from 'lodash/isEqual';
import styled from 'styled-components/macro';

interface ListBoxProps {
  titleText: string,
  errorMessage?: string,
  rows: React.ReactNode[],
}

/** Generic List container for rendering a set of rows.
 *  @param titleText string for the title of the container
 *  @param rows an array of React.ReactNode
 */
const ListBox = ({ titleText, errorMessage = '', rows }: ListBoxProps) => {
  const [rowAmount, setRowAmount] = useState(5);

  const handleExpandRows = () => {
    setRowAmount(rowAmount + 5);
  };

  return (
    <Container>
      <Title>
        {titleText}
      </Title>
      <RowContainer>
        {rows.filter((row: any, index: number) => index < rowAmount)}
      </RowContainer>
      {rows.length === 0 && (
        <ErrorMessage>
          {errorMessage}
        </ErrorMessage>
      )}
      {rows.length > rowAmount && <SeeMore onClick={handleExpandRows}>See More</SeeMore>}
    </Container>
  );
};

export default React.memo(ListBox,
  (prevProps, nextProps) => isEqual(prevProps, nextProps));

const Container = styled.div`
  flex: 1;
  height: 295px;
  margin-top: 50px;
  overflow-y: auto;
  overflow-x: hidden;

  border-radius: 10px;
  box-shadow: 0px 4px 4px 0px rgba(0,0,0,0.25);
  
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ErrorMessage = styled.div`
  padding: 10px 0 10px 10px;
  font-size: 24px;
  background-color: white;
`;

const RowContainer = styled.div`
  width: 100%;
  & > *:nth-child(2n + 1) {
    background-color: #F3F3F3;
  }
`;

const SeeMore = styled.div`
  padding: 5px;
  color: #2962FF;
  font-size: 16px;
  text-decoration: underline;
  cursor: pointer;
`;

const Title = styled.div`
  position: sticky;
  top: 0px;
  width: 100%;

  background-color: white;
  padding: 10px 0 10px 20px;
  font-size: 28px;
`;
