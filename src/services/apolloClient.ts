import { ApolloClient, InMemoryCache } from '@apollo/client/core'
import createUploadLink from 'apollo-upload-client/createUploadLink.mjs'

const cache = new InMemoryCache()
export const defaultClient = new ApolloClient({
  link: createUploadLink({
    uri: import.meta.env.VITE_API_URL + '/graphql',
    headers: {
      'x-apollo-operation-name': 'UploadAudio',
      Accept: 'multipart/mixed;deferSpec=20220824, application/json',
    },
  }),
  cache,
  queryDeduplication: false,
})
