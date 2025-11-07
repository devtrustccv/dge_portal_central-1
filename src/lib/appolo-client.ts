import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const createAuthLink = () => {
   return setContext((_, { headers }) => {
      const token = process.env.API_TOKEN;

      return {
         headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : '',
         },
      };
   });
};

const httpLink = createHttpLink({
   uri: `${process.env.CMS_URL}/graphql`,
});

const authLink = createAuthLink();
export const client = new ApolloClient({
   ssrMode: false,
   link: authLink.concat(httpLink),
   cache: new InMemoryCache(),
   defaultOptions: {
      watchQuery: {
         fetchPolicy: 'no-cache',
      },
      query: {
         fetchPolicy: 'no-cache',
      },
   },
});