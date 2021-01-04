import React, { useState } from 'react';
import styled from 'styled-components/macro';
import { XIcon } from 'icons';

interface SearchBarProps {
  searchType: 'Id' | 'Search',
  searchTerm: string,
  setSearchTerm: React.Dispatch<string>,
}

const SearchBar = ({ searchType, searchTerm, setSearchTerm }: SearchBarProps) => {
  const [visible, setVisible] = useState(true);

  return (
    <Container>
      <SearchTypeContainer onClick={() => setVisible(!visible)}>
        {visible && searchType}
      </SearchTypeContainer>
      <SearchInput
        placeholder={searchType === 'Id'
          ? 'Enter IMDb movie ID, ie. "tt3783958"'
          : 'Search for a movie, ie. "La La land"'}
        onChange={(e) => setSearchTerm(e.target.value)}
        value={searchTerm}
      />
      <ClearSearchContainer onClick={() => setSearchTerm('')}>
        {searchTerm && <XIcon />}
      </ClearSearchContainer>
    </Container>

  );
};

export default React.memo(SearchBar);

const Container = styled.div`
  position: relative;
  width: 100%;

  display: flex;
  align-items: center;
`;

const ClearSearchContainer = styled.div`
  position: absolute;
  right: 15px;
  cursor: pointer;
`;

const SearchInput = styled.input`
  flex: 1;
  height: 50px;
  padding-left: 20px;
  border-radius: 10px;
  border: none;

  font-size: 24px;
  box-sizing: border-box;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SearchTypeContainer = styled.div`
  height: 50px;
  width: 100px;
  padding: 0 10px;
  margin: 0 20px;
  border-radius: 10px;

  font-size: 24px;
  color: #2962ff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;
`;
