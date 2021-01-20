import React, { useState } from 'react';
import styled from 'styled-components/macro';
import firebase from 'firebase/app';
import {
  Banner, Footer, GlobalNominationsBox, ListBox,
  NominationsBox, SearchBar, SearchResultRow, SignInButton,
} from 'components';
import { useGetBannerState, useOmdbApi } from 'hooks';
import { useFirebaseState } from 'components/Firebase/FirebaseProvider';

/**
 * Main Component for the app. Contains all the major sub components
 */

const MainPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchType, setSearchType] = useState<'Search' | 'Id'>('Search');
  const [bannerVisible, setBannerVisible] = useState(false);
  const { nominations } = useFirebaseState();
  const { res: searchResults, err } = useOmdbApi({ searchTerm, type: searchType });
  const uid = firebase.auth().currentUser?.uid;
  const bannerState = useGetBannerState({
    nominationsLength:
    Object.keys(nominations).filter((key) => nominations[key].nominated).length,
    uid,
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
        <SignInButton />
        <Title>The Shoppies</Title>
        <SearchBar
          searchType={searchType}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          setSearchType={setSearchType}
        />
        <ListBox
          titleText={searchTerm ? `Results for "${searchTerm}"` : 'Search Results'}
          rows={searchResults.map((result) => (
            <SearchResultRow
              key={result.imdbID}
              title={result.Title}
              year={result.Year}
              imdbId={result.imdbID}
              poster={result.Poster}
              isNominated={nominations[result.imdbID]?.nominated}
            />
          ))}
          errorMessage={`${err} Try clicking on Type: ${searchType} to switch search types.`}
        />
        <FlexRow>
          <NominationsBox />
          <Seperator />
          <GlobalNominationsBox />
        </FlexRow>
        <Footer />
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
  position: relative;
  flex: 1;
  padding: 50px 50px 20px 50px;
  display: flex;
  flex-direction: column;

  @media (max-width: 600px) {
    padding: 15px;
  }
`;

const FlexRow = styled.div`
  width: 100%;
  display: flex;

  @media (max-width: 600px) {
    flex-direction: column;
  }
`;

const Seperator = styled.div`
  width: 30px;
`;

const Title = styled.div`
  padding-bottom: 20px;
  font-size: 48px;
`;
