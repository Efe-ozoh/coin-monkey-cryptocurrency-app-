import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const cryptoApiHeaders = {
    'x-rapidapi-key': '601ac2320cmsh74b4b501b8b83bep149268jsn4e691cb504e0',
    'x-rapidapi-host': 'coinranking1.p.rapidapi.com',
};

const apiUrl = 'https://coinranking1.p.rapidapi.com';

const createRequest = (url) => ({ url, headers: cryptoApiHeaders });

export const cryptoApi = createApi({
    reducerPath: 'cryptoApi',
    baseQuery: fetchBaseQuery({ baseUrl: apiUrl }),
    endpoints: (builder) => ({
        getCryptos: builder.query({
            query: (count) => createRequest(`/coins?limit=${count}`),
        }),
        getCryptoDetails: builder.query({
            query: (coinId) => createRequest(`/coin/${coinId}`),
        }),
        getCryptoHistory: builder.query({
            query: ({ coinId, timeperiod }) => createRequest(`https://coinranking1.p.rapidapi.com/coin/${coinId}/history?referenceCurrencyUuid=yhjMzLPhuIDl&timePeriod=${timeperiod}`,),
          }),
        getExchanges: builder.query({
            query: () => createRequest('/exchanges'),
          }),
    }),
});

export const { useGetCryptosQuery, useGetExchangesQuery, useGetCryptoDetailsQuery, useGetCryptoHistoryQuery } = cryptoApi;
