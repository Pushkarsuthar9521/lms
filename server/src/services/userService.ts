import { dataSource } from '../config/dataSource'
import { Course } from '../entities/course.entity'
import { User } from '../entities/user.entity'
import { UserInput } from '../resolvers/userResolver'

export class userService {
  private userRepository = dataSource.getRepository(User)
  private courseRepository = dataSource.getRepository(Course)

  async getAllUsers() {
    return await this.userRepository.find()
  }

  async getUserById(id: string) {
    return await this.userRepository.findOneBy({ id })
  }

  async getUserByEmail(email: string) {
    return await this.userRepository.findOneBy({ email })
  }

  async createUser(data: UserInput) {
    const user = this.userRepository.create({
      name: data.name,
      email: data.email,
      phone: data.phone,
      password: data.password
    })
    return await this.userRepository.save(user)
  }
}
