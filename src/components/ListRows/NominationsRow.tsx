import React from 'react';
import styled from 'styled-components/macro';
import { TrashIcon } from 'icons';
import { useFirebaseDispatch } from 'components/Firebase/FirebaseProvider';

interface NominationsRowProp {
  title: string,
  year: string,
  imdbId: string,
}

const NominationsRow = ({
  title, year, imdbId,
}: NominationsRowProp) => {
  const dispatch = useFirebaseDispatch();
  const removeNomination = () => {
    dispatch({ type: 'remove', payload: { imdbId } });
  };

  return (
    <RowContainer>
      <div>
        {`${title} (${year})`}
      </div>
      <ImageContainer
        onClick={removeNomination}
      >
        <TrashIcon />
      </ImageContainer>
    </RowContainer>
  );
};

export default React.memo(NominationsRow);

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
