import React from 'react';
import styled from 'styled-components/macro';

interface GlobalNominationsRowProps {
  title: string,
  count: number,
  year: string,
}

const GlobalNominationsRow = ({ title, count, year }: GlobalNominationsRowProps) => (
  <RowContainer>
    <div>
      {`${title} (${year}):`}
    </div>
    <div>
      {count}
    </div>
  </RowContainer>
);

export default React.memo(GlobalNominationsRow);

const RowContainer = styled.div`
  width: 100%;
  padding: 10px 10px 10px 20px;
  font-size: 20px;
  box-sizing: border-box;

  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (max-width: 600px) {
    font-size: 16px;
  }
`;
