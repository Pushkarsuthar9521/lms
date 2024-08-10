import swagger from '@fastify/swagger'
import fastify from 'fastify'
import 'reflect-metadata'
import { dataSource } from './data-source'
const app = fastify()

const PORT = process.env.PORT || 5000

app.register(swagger, {
  openapi: {
    openapi: '3.0.0',
    info: {
      title: 'Test swagger',
      description: 'Testing the Fastify swagger API',
      version: '0.1.0'
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Development server'
      }
    ],
    tags: [
      { name: 'user', description: 'User related end-points' },
      { name: 'code', description: 'Code related end-points' }
    ],
    components: {
      securitySchemes: {
        apiKey: {
          type: 'apiKey',
          name: 'apiKey',
          in: 'header'
        }
      }
    },
    externalDocs: {
      url: 'https://swagger.io',
      description: 'Find more info here'
    }
  }
})

app.post(
  '/',
  {
    schema: {
      operationId: 'getSomething',
      tags: ['user'],
      summary: 'Get something',
      description: 'Get something from the server',
      body: {
        type: 'object',
        properties: {
          name: { type: 'string', minLength: 1, format: 'email' }
        },
        required: ['name']
      }
    }
  },
  (req, res) => {
    res.send('This is my first server!')
  }
)

app.ready().then(() => {
  const files = app.swagger()

  app.listen({ port: 5000 }, () => {
    console.log(`express server started at port ${PORT}`)
  })
})

const main = async () => {
  try {
    await dataSource.initialize()

    console.log('Database connected')
  } catch (error) {
    console.log('Database connection failed')
  }
}

main()
