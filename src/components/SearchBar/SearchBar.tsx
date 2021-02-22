import React from 'react';
import styled from 'styled-components/macro';
import { XIcon } from 'icons';

interface SearchBarProps {
  searchType: 'Song' | 'Artist',
  setSearchType: React.Dispatch<'Song' | 'Artist'>
  searchTerm: string,
  setSearchTerm: React.Dispatch<string>,
}

/** The Search Bar that handles searches to OMDb Api.
 *  @param searchType one of ['Id', 'Search']; determines search type
 *  @param searchTerm the searchTerm in the searchbar
 *  @param setSearchTerm the React setState for searchTerm
 */
const SearchBar = ({
  searchType, setSearchType, searchTerm, setSearchTerm,
}: SearchBarProps) => (
  <Container>
    <SearchTypeContainer onClick={() => setSearchType(searchType === 'Song' ? 'Artist' : 'Song')}>
      {`Type: ${searchType}`}
    </SearchTypeContainer>
    <SearchInput
      placeholder={searchType === 'Song'
        ? 'Enter a song name'
        : 'Enter an artist name'}
      onChange={(e) => setSearchTerm(e.target.value)}
      value={searchTerm}
    />
    <ClearSearchContainer onClick={() => setSearchTerm('')}>
      {searchTerm && <XIcon />}
    </ClearSearchContainer>
  </Container>

);

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

  @media (max-width: 600px) {
    font-size: 16px;
  }
`;

const SearchTypeContainer = styled.div`
  height: 50px;
  width: 140px;
  padding: 0 10px;
  margin-right: 20px;
  border-radius: 10px;

  font-size: 24px;
  color: #2962ff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 600px) {
    font-size: 16px;
  }
`;
