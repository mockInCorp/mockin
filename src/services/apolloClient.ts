import { storeToRefs } from 'pinia'

import { useAuthenticationStore } from '@/stores/authentication'
import { ApolloClient, ApolloLink, InMemoryCache } from '@apollo/client/core'
import { setContext } from '@apollo/client/link/context'

import createUploadLink from 'apollo-upload-client/createUploadLink.mjs'

const cache = new InMemoryCache()
const authLink = setContext(async (_, { headers }) => {
  const { token } = storeToRefs(useAuthenticationStore())

  let defaultHeaders: Record<string, unknown> = {}
  if (headers) {
    defaultHeaders = { ...defaultHeaders, ...headers }
  }

  if (token.value) {
    defaultHeaders['authorization'] = `Bearer ${token.value}`
  }

  defaultHeaders['content-type'] = 'application/json'

  return { headers: defaultHeaders }
})
const httpLink: ApolloLink = createUploadLink({
  uri: import.meta.env.VITE_API_URL + '/graphql',
  headers: {
    'x-apollo-operation-name': 'UploadAudio',
    accept: 'multipart/mixed; deferSpec=20220824, application/json',
  },
})

export const defaultClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache,

  queryDeduplication: false,
})
