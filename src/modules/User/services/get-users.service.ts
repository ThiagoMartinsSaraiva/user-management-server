import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { UserCacheService } from 'src/infra/cache/user-cache.service';
import { PrismaService } from 'src/infra/database/prisma/prisma.service';

@Injectable()
export class GetUsersService {
  constructor(
    private readonly context: PrismaService,
    private userCacheService: UserCacheService,
  ) {}
  async run(

  ): Promise<User[]> {
    const cachedUsers = await this.userCacheService.getList()

    if (cachedUsers) {
      return cachedUsers
    }

    const users = await this.context.user.findMany()
    
    if (users.length) {
      await this.userCacheService.setList(users)
    }

    return users
  }
}
