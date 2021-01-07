import React from 'react';
import styled from 'styled-components';

interface SearchResultRowsProp {
  title: string,
  year: string,
  imdbId: string,
}

const SearchResultRows = ({
  title, year, imdbId,
}: SearchResultRowsProp) => (
  <RowContainer
    href={`https://www.imdb.com/title/${imdbId}/`}
    target="_blank"
  >
    {`${title} (${year})`}
  </RowContainer>
);

export default SearchResultRows;

const RowContainer = styled.a`
  width: 100%;
  padding: 10px 10px 10px 20px;
  font-size: 20px;
  box-sizing: border-box;

  display: flex;
  align-items: center;
  justify-content: space-between;
`;
