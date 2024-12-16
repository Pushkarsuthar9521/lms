import { ApolloError } from 'apollo-server-errors'

export const errorHandler = (message: string, code: string = 'Bad_Request') => {
  throw new ApolloError(message, code)
}
