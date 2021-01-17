import React, { useEffect, useState } from 'react';
import styled from 'styled-components/macro';
import { TrashIcon } from 'icons';
import { useFirebaseDispatch } from 'components/Firebase/FirebaseProvider';

interface NominationsRowProp {
  title: string,
  year: string,
  imdbId: string,
}

/**
 * A row in the Nominations Box, can remove nomination from state.
 * @param title Title of the imdb movie
 * @param year Year of the movie
 * @param imdbId Unique imdbId for the movie
 */
const NominationsRow = ({
  title, year, imdbId,
}: NominationsRowProp) => {
  const [isSaved, setIsSaved] = useState(false);

  const dispatch = useFirebaseDispatch();
  const removeNomination = () => {
    dispatch({ type: 'remove', payload: { imdbId } });
  };

  useEffect(() => {
    setTimeout(() => {
      setIsSaved(true);
    }, 500);
  }, []);

  return (
    <RowContainer>
      <div>
        {`${title} (${year})`}
      </div>
      <FlexRow>
        <SavedText>
          {isSaved ? 'saved' : 'saving...'}
        </SavedText>
        <ImageContainer
          onClick={removeNomination}
        >
          <TrashIcon />
        </ImageContainer>
      </FlexRow>
    </RowContainer>
  );
};

export default React.memo(NominationsRow);

const FlexRow = styled.div`
  display: flex;
  align-items: center;
`;

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

  @media (max-width: 600px) {
    font-size: 16px;
  }
`;

const SavedText = styled.div`
  margin-right: 20px;
  font-size: 14px;
  text-decoration: underline;
  opacity: 0.4;
`;
