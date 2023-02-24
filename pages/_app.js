import "../styles/globals.scss";
import React, { useEffect, useState } from "react";
import { Layout } from "../components";
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from "@apollo/client";

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;

export const client = new ApolloClient({
  link: createHttpLink({
    uri: graphqlAPI,
  }),
  cache: new InMemoryCache(),
});
export default function App({ Component, pageProps }) {
  return (
    <Layout>
      <ApolloProvider client={client}>
        <Component {...pageProps} />
      </ApolloProvider>
    </Layout>
  );
}
