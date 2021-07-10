import { EntityRepository, Repository } from "typeorm";
import { User } from "./user.entity";
import * as bcrypt from 'bcrypt';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { ConflictException, InternalServerErrorException } from '@nestjs/common';
@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async createUser(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    const { username, password } = authCredentialsDto

    const salt = await bcrypt.genSalt()
    const hashedPassword = await bcrypt.hash(password, salt)

    const user = this.create({
      username,
      password: hashedPassword,
    })

    try {
      await this.save(user)
    } catch (error) {
      console.error('UserRepository', error.code);
      // Duplication username
      if (error.code === '23505') {
        throw new ConflictException('Username already exists')
      }
      else {
        throw new InternalServerErrorException()
      }
    }
  }
}