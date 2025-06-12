import { ConflictException, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/infra/database/prisma/prisma.service';
import { CreateUserDTO } from '../dtos/create-user.dto';
import { UserCacheService } from 'src/infra/cache/user-cache.service';

@Injectable()
export class CreateUserService {
  constructor(
    private readonly context: PrismaService,
    private userCacheService: UserCacheService,
  ) {}

  async run(user: CreateUserDTO): Promise<User> {
    const existingUser = await this.context.user.findUnique({
      where: {
        email: user.email,
      }
    })

    if (existingUser) {
      throw new ConflictException('This email is already taken')
    }

    const createdUser = await this.context.user.create({
      data: {
        ...user,
      }
    })

    await this.userCacheService.clearList()

    return createdUser
  }
}
