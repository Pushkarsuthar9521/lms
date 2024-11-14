import { Query, Resolver } from 'type-graphql'

@Resolver()
export class HelloResolver {
  @Query(() => String, { description: 'A Test Query' })
  hello() {
    return 'Hello, World!'
  }
}
