import { Arg, Field, InputType, Mutation, Query, Resolver } from 'type-graphql'
import { User } from '../entities/user.entity'
import { userService } from '../services/userService'
import { errorHandler } from '../utils/errors'

const UserService = new userService()

@InputType()
export class UserInput {
  @Field(() => String)
  name!: string

  @Field(() => String)
  email!: string

  @Field({ nullable: true })
  phone?: number

  @Field(() => String)
  password!: string
}

@Resolver()
export class userResolver {
  @Query(() => [User])
  async getAllUsers(): Promise<User[]> {
    return await UserService.getAllUsers()
  }

  @Mutation(() => String)
  async createUser(@Arg('data') data: UserInput): Promise<string> {
    if (!data) errorHandler('No data provided', 'BAD_REQUEST')

    const user = await UserService.getUserByEmail(data.email)
    if (user) errorHandler('Email already exists', 'CONFLICT')
    await UserService.createUser(data)
    return 'User created'
  }
}
