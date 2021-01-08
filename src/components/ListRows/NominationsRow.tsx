import React from 'react';
import styled from 'styled-components';
import { TrashIcon } from 'icons';

interface SearchResultRowsProp {
  title: string,
  year: string,
  removeNomination: () => void
}

const SearchResultRows = ({
  title, year, removeNomination,
}: SearchResultRowsProp) => (
  <RowContainer>
    <div>
      {`${title} (${year})`}
    </div>
    <ImageContainer onClick={removeNomination}>
      <TrashIcon />
    </ImageContainer>
  </RowContainer>
);

export default SearchResultRows;

const ImageContainer = styled.div`
  cursor: pointer;

  & > svg > path {
    stroke: #D50000;
    
  }
`;

const RowContainer = styled.div`
  width: 100%;
  padding: 10px 10px 10px 20px;
  font-size: 20px;
  box-sizing: border-box;

  display: flex;
  align-items: center;
  justify-content: space-between;
`;
