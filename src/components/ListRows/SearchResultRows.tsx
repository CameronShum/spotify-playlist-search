import React, { useState, useEffect } from 'react';
// import styled from 'styled-components';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

// type nominations = {[s: string]: {id: string, name: string}}

interface SearchResultRowsProp {
  searchTerm: string,
  type: 'Id' | 'Search',
  // nominations: nominations,
  // setNominations: React.Dispatch<nominations>
}

const SearchResultRows = ({
  searchTerm, type, // nominations, setNominations,
}: SearchResultRowsProp) => {
  const [res, setRes] = useState<any>([]);

  useEffect(() => {
    if (searchTerm !== '') {
      let params = {};

      if (type === 'Search') {
        params = {
          s: searchTerm,
          type: 'movie',
          apiKey: process.env.REACT_APP_OMBD_APIKEY,
        };
      } else {
        params = {
          i: searchTerm,
          type: 'movie',
          apiKey: process.env.REACT_APP_OMBD_APIKEY,
        };
      }
      (async function getApiResults() {
        const getRequest = await axios.get('http://www.omdbapi.com', {
          params,
        });

        if (getRequest.data.Response === 'Truea') {
          setRes(type === 'Search' ? getRequest.data.Search : [getRequest.data]);
        }
      }());
    }
  });

  return (res.map((value: any) => <div>{value.Title}</div>));
};

export default SearchResultRows;
