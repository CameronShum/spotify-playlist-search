import React, { useState } from 'react';
import styled from 'styled-components/macro';
import {
  Banner, ListBox, SearchBar, SearchResultRow,
} from 'components';
import { useGetBannerState, useOmdbApi } from 'hooks';
import nominationsType from 'types/nominations.types';
import { NominationsRow } from 'components/ListRows';

const MainPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [bannerVisible, setBannerVisible] = useState(false);
  const [nominations, setNominations] = useState<nominationsType>({});
  const searchResults = useOmdbApi({ searchTerm, type: 'Search' });
  const bannerState = useGetBannerState({
    nominationsLength:
    Object.keys(nominations).filter((key) => nominations[key].nominated).length,
    setBannerVisible,
  });

  return (
    <Container>
      {bannerVisible && (
      <Banner
        type={bannerState.type}
        message={bannerState.message}
        setBannerVisible={setBannerVisible}
      />
      )}
      <ComponnentsContainer>
        <Title>The Shoppies</Title>
        <SearchBar searchType="Search" searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <ListBox
          titleText={searchTerm && searchResults.length !== 0 ? `Results for "${searchTerm}"` : 'No results found.'}
          rows={searchResults.map((result) => (
            <SearchResultRow
              title={result.Title}
              year={result.Year}
              imdbId={result.imdbID}
              nominations={nominations}
              setNominations={setNominations}
            />
          ))}
        />
        <ListBox
          titleText="Nominations"
          rows={Object.keys(nominations).map((key) => (
            nominations[key].nominated && (
            <NominationsRow
              title={nominations[key].title}
              year={nominations[key].year}
              removeNomination={() => setNominations({
                ...nominations,
                [key]: { ...nominations[key], nominated: false },
              })}
            />
            )
          ))}
        />
      </ComponnentsContainer>
    </Container>
  );
};

export default React.memo(MainPage);

const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

const ComponnentsContainer = styled.div`
  flex: 1;
  padding: 50px;
`;

const Title = styled.div`
  padding-bottom: 20px;
  font-size: 48px;
`;
