import { ApolloClient, HttpLink, InMemoryCache, split } from '@apollo/client';
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";
import { getMainDefinition } from '@apollo/client/utilities';

// Add the admin secret here
const adminSecret = "0eW0K95t9BxtSPgXo6vhDxXlWjWdWVL/njXEzG0Q9WE";
const token = localStorage.getItem('token')
const httpLink = new HttpLink({
  uri: 'http://172.17.15.42:31000/v1/graphql',
  headers: {
    'x-hasura-admin-secret': adminSecret, // Add the admin secret in the header
    Authorization: `Bearer ${token}`
  }
});

const wsLink = new GraphQLWsLink(createClient({
  url: 'ws://172.17.15.42:31000/v1/graphql',
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

export const client_hasura = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
});