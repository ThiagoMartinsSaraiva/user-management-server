import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/infra/database/prisma/prisma.service';
import { UpdateUserDTO } from '../dtos/update-user.dto';
import { UserCacheService } from 'src/infra/cache/user-cache.service';

@Injectable()
export class UpdateUserService {
  constructor(
    private readonly context: PrismaService,
    private userCacheService: UserCacheService,
  ) {}

  async run(userId: string, user: UpdateUserDTO): Promise<User> {
    try {
      const updatedUser = await this.context.user.update({
        where: {
          id: userId,
        },
        data: {
          name: user.name,
          email: user.email,
        }
      })

      await this.userCacheService.setUser(updatedUser)
      await this.userCacheService.clearList()

      return updatedUser
    } catch (err) {
      return null
    }
  }
}
