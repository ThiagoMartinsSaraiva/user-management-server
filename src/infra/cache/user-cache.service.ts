import { CACHE_MANAGER } from "@nestjs/cache-manager";
import { Inject, Injectable } from "@nestjs/common";
import { User } from "@prisma/client";
import { Cache } from "cache-manager";

@Injectable()
export class UserCacheService {
  private TTL = 60 * 1000

  constructor(@Inject(CACHE_MANAGER) private cache: Cache) {}

  async getUser(id: string): Promise<User | null> {
    return await this.cache.get<User>(`user-${id}`);
  }

  async setUser(user: User) {
    await this.cache.set(`user-${user.id}`, user, this.TTL);
  }

  async clearUser(id: string) {
    await this.cache.del(`user-${id}`);
  }

  async getList() {
    return await this.cache.get<User[]>('users');
  }

  async setList(users: User[]) {
    return await this.cache.set<User[]>('users', users, this.TTL);
  }
  
  async clearList() {
    await this.cache.del('users');
  }
}