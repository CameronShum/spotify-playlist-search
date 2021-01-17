import { useState, useEffect } from 'react';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

interface useOmdbApiProps {
  searchTerm: string,
  type: 'Id' | 'Search',
}

const useOmdbApi = ({
  searchTerm, type,
}: useOmdbApiProps): {Title: string, Year: string, imdbID: string}[] => {
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
        const getRequest = await axios.get('https://www.omdbapi.com', {
          params,
        });

        if (getRequest.data.Response === 'True') {
          setRes(type === 'Search' ? getRequest.data.Search : [getRequest.data]);
        }
      }());
    } else {
      setRes([]);
    }
  }, [searchTerm, type]);

  return res;
};

export default useOmdbApi;
