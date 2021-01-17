import React from 'react';
import styled from 'styled-components/macro';
import { PlusIcon } from 'icons';
import { useFirebaseDispatch } from 'components/Firebase/FirebaseProvider';

interface SearchResultRowProp {
  title: string,
  year: string,
  imdbId: string,
  isNominated: boolean,
}

const SearchResultRow = ({
  title, year, imdbId, isNominated,
}: SearchResultRowProp) => {
  const dispatch = useFirebaseDispatch();
  const setNomination = () => {
    dispatch({
      type: 'nominate',
      payload: {
        title,
        imdbId,
        year,
      },
    });
  };

  return (
    <RowContainer>
      <a
        href={`https://www.imdb.com/title/${imdbId}/`}
        target="_blank"
        rel="noreferrer"
      >
        {`${title} (${year})`}
      </a>
      <NominateContainer
        isNominated={isNominated}
      >
        <ImageContainer onClick={setNomination}>
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

  @media (max-width: 600px) {
    font-size: 16px;
  }
`;

const NominateContainer = styled.div<{isNominated: boolean}>`
  opacity: ${(props) => props.isNominated && 0.5};
  cursor: ${(props) => (props.isNominated ? 'not-allowed' : 'pointer')};

  & > div {
    cursor: pointer;
    pointer-events: ${(props) => props.isNominated && 'none'};
  }
`;
