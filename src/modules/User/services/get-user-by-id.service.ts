import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { UserCacheService } from 'src/infra/cache/user-cache.service';
import { PrismaService } from 'src/infra/database/prisma/prisma.service';

@Injectable()
export class GetUserByIdService {
  constructor(
    private readonly context: PrismaService,
    private userCacheService: UserCacheService,
  ) {}

  async run(userId: string): Promise<User> {
    const cachedUser = await this.userCacheService.getUser(userId)

    if (cachedUser) {
      return cachedUser
    }

    const user = await this.context.user.findFirst({
      where: {
        id: userId,
      }
    })

    if (user) {
      await this.userCacheService.setUser(user)
    }

    return user
  }
}
