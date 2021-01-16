import React, { useState } from 'react';
import styled from 'styled-components/macro';

interface ListBoxProps {
  titleText: string,
  rows: any,
}

/** Generic List container for rendering a set of rows.
 *  @param titleText string for the title of the container
 *  @param rows an array of JSX.Elements
 */
const ListBox = ({ titleText, rows }: ListBoxProps) => {
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
      {rows.length > rowAmount && <SeeMore onClick={handleExpandRows}>See More</SeeMore>}
    </Container>
  );
};

export default React.memo(ListBox);

const Container = styled.div`
  min-height: 150px;
  max-height: 300px;
  margin-top: 50px;
  overflow-y: auto;
  overflow-x: hidden;

  border-radius: 10px;
  box-shadow: 0px 4px 4px 0px rgba(0,0,0,0.25);
  
  display: flex;
  flex-direction: column;
  align-items: center;
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
  width: 100%;
  padding: 10px 0 10px 20px;
  font-size: 28px;
`;
