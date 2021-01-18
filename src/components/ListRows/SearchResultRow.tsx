import React, { useState } from 'react';
import styled from 'styled-components/macro';
import { PlusIcon } from 'icons';
import { useFirebaseDispatch } from 'components/Firebase/FirebaseProvider';
import PosterNotAvailable from 'components/PosterNotAvailable';

interface SearchResultRowProp {
  title: string,
  year: string,
  imdbId: string,
  poster: string,
  isNominated: boolean,
}

/**
 * A row in the Search Results Box, can add nomination to state.
 * @param title Title of the imdb movie
 * @param year Year of the movie
 * @param imdbId Unique imdbId for the movie
 * @param poster Poster
 * @param isNominated flag to disable nomination button
 */
const SearchResultRow = ({
  title, year, imdbId, poster, isNominated,
}: SearchResultRowProp) => {
  const [posterVisible, setPosterVisible] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
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
      <ListContainer
        onMouseOver={(e) => {
          setMousePos({ x: e.clientX, y: e.clientY });
          setPosterVisible(true);
        }}
        onMouseOut={() => setPosterVisible(false)}
      >
        <a
          href={`https://www.imdb.com/title/${imdbId}/`}
          target="_blank"
          rel="noreferrer"
        >
          {`${title} (${year})`}
        </a>
        {(posterVisible)
      && (
      <PosterContainer
        mousePos={mousePos}
      >
        {poster !== 'N/A' ? (
          <img
            src={poster}
            alt={`${title} (${year}) Poster`}
          />
        ) : <PosterNotAvailable />}

      </PosterContainer>
      )}
      </ListContainer>
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

const ListContainer = styled.div`
  padding: 10px 0px;
`;

const NominateContainer = styled.div<{isNominated: boolean}>`
  opacity: ${(props) => props.isNominated && 0.5};
  cursor: ${(props) => (props.isNominated ? 'not-allowed' : 'pointer')};

  & > div {
    cursor: pointer;
    pointer-events: ${(props) => props.isNominated && 'none'};
  }
`;

const PosterContainer = styled.div<{mousePos: {x: number, y: number}}>`
  top: ${(props) => props.mousePos.y - 10}px;
  left: ${(props) => props.mousePos.x - 10}px;;
  position: absolute;
  z-index: 1;
`;

const RowContainer = styled.div`
  width: 100%;
  padding-left: 20px;
  padding-right: 10px;
  font-size: 20px;
  box-sizing: border-box;

  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (max-width: 600px) {
    font-size: 16px;
  }
`;
