import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { UserCacheService } from 'src/infra/cache/user-cache.service';
import { PrismaService } from 'src/infra/database/prisma/prisma.service';

@Injectable()
export class DeleteUserService {
  constructor(
    private readonly context: PrismaService,
    private userCacheService: UserCacheService,
  ) {}

  async run(userId: string): Promise<User> {
    try {
      const user = await this.context.user.delete({
        where: {
          id: userId,
        }
      })

      await this.userCacheService.clearList()
      await this.userCacheService.clearUser(userId)

      return user
    } catch (err) {
      return null
    }
  }
}
