import React from 'react';
import styled from 'styled-components';
import { TrashIcon } from 'icons';

interface NominationsRowProp {
  title: string,
  year: string,
  removeNomination: () => void
}

const NominationsRow = ({
  title, year, removeNomination,
}: NominationsRowProp) => (
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
`;
