import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const cryptoNewsHeader = {
  'x-rapidapi-key': '601ac2320cmsh74b4b501b8b83bep149268jsn4e691cb504e0',
  'x-rapidapi-host': 'cryptocurrency-news2.p.rapidapi.com'
};

const apiUrl = 'https://cryptocurrency-news2.p.rapidapi.com/';

const createRequest = (url) => ({ url, headers: cryptoNewsHeader });

export const cryptoNewsApi = createApi({
  reducerPath: 'cryptoNewsApi',
  baseQuery: fetchBaseQuery({ baseUrl: apiUrl }),
  endpoints: (builder) => ({
    getCryptoNews: builder.query({
      query: (count) =>
        createRequest(`v1/cryptodaily?limit=${count}`),
    }),
  }),
});


export const { useGetCryptoNewsQuery } = cryptoNewsApi;
