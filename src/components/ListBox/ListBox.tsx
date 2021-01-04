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
        {rows}
        {/* {rows.filter((row: any, index: number) => index < rowAmount)} */}
      </RowContainer>
      <SeeMore onClick={handleExpandRows}>See More</SeeMore>
      {/* {rows.length > rowAmount && <SeeMore onClick={handleExpandRows}>See More</SeeMore>} */}
    </Container>
  );
};

export default ListBox;

const Container = styled.div`
  box-shadow: 0px 4px 4px 0px #000000 25%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const RowContainer = styled.div`
  & > div:nth-child(2n) {
    background-color: #F3F3F3;
  }
`;

const SeeMore = styled.div`
  color: #2962FF;
  font-size: 16px;
  text-decoration: underline;
  cursor: pointer;
`;

const Title = styled.div`
  width: 100%;
  font-size: 28px;
`;
