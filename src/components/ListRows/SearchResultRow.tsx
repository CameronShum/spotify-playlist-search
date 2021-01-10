import React from 'react';
import styled from 'styled-components';
import nominationsType from 'types/nominations.types';
import { PlusIcon } from 'icons';

interface SearchResultRowProp {
  title: string,
  year: string,
  imdbId: string,
  nominations: nominationsType,
  setNominations: React.Dispatch<nominationsType>
}

const SearchResultRow = ({
  title, year, imdbId, nominations, setNominations,
}: SearchResultRowProp) => {
  const handleSetNomination = () => {
    const newNominations = { ...nominations };
    newNominations[imdbId] = {
      title,
      nominated: true,
      year,
    };

    setNominations(newNominations);
  };
  return (
    <RowContainer>
      <a
        href={`https://www.imdb.com/title/${imdbId}/`}
        target="_blank"
        rel="noreferrer"
      >
        {console.log(`Rerender Search: ${title} (${year})`)}
        {`${title} (${year})`}
      </a>
      <NominateContainer
        isNominated={nominations[imdbId] !== undefined && nominations[imdbId].nominated}
      >
        <ImageContainer onClick={handleSetNomination}>
          <PlusIcon />
        </ImageContainer>
      </NominateContainer>
    </RowContainer>
  );
};

export default React.memo(SearchResultRow);

const ImageContainer = styled.div`
  cursor: pointer;
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

const NominateContainer = styled.div<{isNominated: boolean}>`
  opacity: ${(props) => props.isNominated && 0.5};
  cursor: ${(props) => (props.isNominated ? 'not-allowed' : 'pointer')};

  & > div {
    cursor: pointer;
    pointer-events: ${(props) => props.isNominated && 'none'};
  }
`;
