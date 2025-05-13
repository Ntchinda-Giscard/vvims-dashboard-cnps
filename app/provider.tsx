"use client"
import '@mantine/core/styles.css';
import { ColorSchemeScript, MantineProvider } from '@mantine/core';
import { ApolloProvider } from '@apollo/client';
import { persistor, store } from '@/app/store';
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react';
import '@mantine/nprogress/styles.css';
import { NavigationProgress } from '@mantine/nprogress';
import NextTopLoader from 'nextjs-toploader';
import {Toaster} from "react-hot-toast"
import { ApolloClient, HttpLink, InMemoryCache, split } from '@apollo/client';
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";
import { getMainDefinition } from '@apollo/client/utilities';
import { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';


export default function Providers({
  children,
}: {
  children: React.ReactNode;
}) {

// const adminSecret = "aFVeqGfcVsDTpS7efXQZ1rlMyIJugSBJ";
const adminSecret = "XVJdrWUXH5hdGh8ET68HtwXVJdrWUXH5hdGh8ET68Htw"
const [token, setToken ] = useState(null)
useEffect(() =>{
  const tokenLocal = window.localStorage.getItem('token')
  //@ts-ignore
  setToken(tokenLocal)
},[])

const httpLink = new HttpLink({
  // uri: 'http://172.17.15.28:30011/v1/graphql',
  uri: 'https://faithful-lynx-39.hasura.app/v1/graphql',
  headers: {
    'x-hasura-admin-secret': adminSecret, // Add the admin secret in the header
    Authorization: `Bearer ${token}`
  }
});

const wsLink = new GraphQLWsLink(createClient({
  // url: 'ws://172.17.15.28:30011/v1/graphql',
  uri: 'https://faithful-lynx-39.hasura.app/v1/graphql',
  connectionParams: {
    headers: {
      'x-hasura-admin-secret': adminSecret, // Add the admin secret for websocket connections too
      Authorization: `Bearer ${token}`
    }
  }
}));

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink
);

const client_hasura = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
});

  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
      </head>
      <body>
      <MantineProvider>
        <ToastContainer />
      <ApolloProvider client={client_hasura}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <NextTopLoader
                color={"#16DBCC"}
                template='<div class="bar" role="bar"><div class="peg"></div></div>'
            />
            <Toaster />
            <NavigationProgress />
            {children}
        </PersistGate>
      </Provider>
      </ApolloProvider>
      </MantineProvider>
      </body>
    </html>
  );
}