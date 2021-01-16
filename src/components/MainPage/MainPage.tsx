import React, { useState } from 'react';
import styled from 'styled-components/macro';
import {
  Banner, ListBox, NominationsRow, SearchBar, SearchResultRow, SignInButton,
} from 'components';
import { useGetBannerState, useOmdbApi } from 'hooks';
import { useFirebaseState } from 'components/Firebase/FirebaseProvider';

const MainPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchType, setSearchType] = useState<'Search' | 'Id'>('Search');
  const [bannerVisible, setBannerVisible] = useState(false);
  const nominations = useFirebaseState();
  const searchResults = useOmdbApi({ searchTerm, type: searchType });
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
      <SignInButton />
      <ComponnentsContainer>
        <Title>The Shoppies</Title>
        <SearchBar
          searchType={searchType}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          setSearchType={setSearchType}
        />
        <ListBox
          titleText={searchTerm && searchResults.length !== 0 ? `Results for "${searchTerm}"` : 'No results found.'}
          rows={searchResults.map((result) => (
            <SearchResultRow
              key={result.imdbID}
              title={result.Title}
              year={result.Year}
              imdbId={result.imdbID}
              isNominated={nominations[result.imdbID]?.nominated}
            />
          ))}
        />
        <FlexRow>
          <ListBox
            titleText="Nominations"
            rows={Object.keys(nominations).map((key) => (
              nominations[key].nominated && (
              <NominationsRow
                key={key}
                title={nominations[key].title}
                year={nominations[key].year}
                imdbId={key}
              />
              )))}
          />
          <Seperator />
          <ListBox
            titleText="Global Nominations"
            rows={Object.keys(nominations).map((key) => (
              nominations[key].nominated && (
              <NominationsRow
                key={key}
                title={nominations[key].title}
                year={nominations[key].year}
                imdbId={key}
              />
              )))}
          />
        </FlexRow>
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

const FlexRow = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
`;

const Seperator = styled.div`
  width: 30px;
`;

const Title = styled.div`
  position: sticky;
  top: 0px;
  padding-bottom: 20px;
  font-size: 48px;
`;
