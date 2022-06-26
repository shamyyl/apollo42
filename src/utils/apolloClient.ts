import { ApolloClient, InMemoryCache } from "@apollo/client";

export const apolloClient = new ApolloClient({
  uri: 'https://api.thegraph.com/subgraphs/name/clockride/apollo42-marketplace',
  cache: new InMemoryCache()
});
