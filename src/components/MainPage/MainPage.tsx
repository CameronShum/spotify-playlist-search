import React, { useState } from 'react';
import styled from 'styled-components/macro';
import { Banner, Footer, SearchBar } from 'components';

/**
 * Main Component for the app. Contains all the major sub components
 */

const MainPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchType, setSearchType] = useState<'Song'|'Artist'>('Song');
  const [bannerVisible, setBannerVisible] = useState(false);
  const bannerState: {type: 'warning', message: string} = { type: 'warning', message: 'Something' };

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
        {/* <SignInButton /> */}
        <Title>Spotify Playlist Search</Title>
        <SearchBar
          searchType={searchType}
          setSearchType={setSearchType}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
        {/* <ListBox
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
        /> */}
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

const Title = styled.div`
  padding-bottom: 20px;
  font-size: 48px;
`;
