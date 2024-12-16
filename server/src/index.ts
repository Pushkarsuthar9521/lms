import { ApolloServer } from '@apollo/server'
import { expressMiddleware } from '@apollo/server/express4'
import express from 'express'
import 'reflect-metadata'
import { buildSchema } from 'type-graphql'
import { connectToDatabase } from './config/dataSource'
import { HelloResolver } from './resolvers/helloResolver'
import { userResolver } from './resolvers/userResolver'

const main = async () => {
  console.log('startin server up.....')

  await connectToDatabase()

  const schema = await buildSchema({
    resolvers: [HelloResolver, userResolver]
    // emitSchemaFile: true
  })
  console.info('GraphQl schema build successfully......')
  const app = express()

  const server = new ApolloServer({
    schema
  })

  await server.start()

  app.use(
    '/graphql',
    express.json({ limit: '50mb' }),
    expressMiddleware(server, {
      context: async ({ req, res }) => ({ req, res })
    })
  )

  app.get('/healthcheck', (_, res) => {
    res.send('OK')
  })

  const port = process.env.PORT || 5000
  app.listen(port, () => {
    console.log(`Server is Running at http://localhost:${port}`)
  })
}
main().catch(error => {
  console.log('Error during server startup: ', error)
})
