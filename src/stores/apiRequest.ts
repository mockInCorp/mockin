import { defineStore } from 'pinia'
import { useLazyQuery, useMutation } from '@vue/apollo-composable'
import type { DocumentNode } from 'graphql'

type TRequestType = 'QUERY' | 'MUTATION'
interface IRequestParams {
  type: TRequestType
  document: DocumentNode
  variables?: Record<string, unknown>
}

export const useAPIRequestStore = defineStore('apiRequest', () => {
  const _parseError = (errors: any) => {
    return (errors || []).map(({ message }: { message: string }) => message).join(', ')
  }

  const _resolveQuery = <T>(document: any, variables: Record<string, unknown>): Promise<T> => {
    return new Promise((resolve, reject) => {
      const { onResult, load, stop } = useLazyQuery(document, variables, {
        errorPolicy: 'all',
        fetchPolicy: 'no-cache',
      })

      onResult(({ data, loading, errors }) => {
        if (!loading) {
          if (errors?.length) {
            return reject(_parseError(errors))
          }
          return resolve(data)
        }
        stop()
      })
      load()
    })
  }

  const _resolveMutation = <T>(document: any, variables: Record<string, unknown>): Promise<T> => {
    return new Promise((resolve, reject) => {
      const { mutate } = useMutation(document, {
        fetchPolicy: 'network-only',
        variables,
      })
      mutate()
        .then(({ data }: any) => resolve(data))
        .catch((error) => {
          console.error(error)
          return reject(_parseError(error?.graphQLErrors))
        })
    })
  }

  const request = async <T>({ type, document, variables = {} }: IRequestParams) => {
    if (type === 'QUERY') {
      return _resolveQuery<T>(document, variables)
    } else if (type === 'MUTATION') {
      return _resolveMutation<T>(document, variables)
    }
    throw new Error('Invalid type provided')
  }

  return {
    request,
  }
})
