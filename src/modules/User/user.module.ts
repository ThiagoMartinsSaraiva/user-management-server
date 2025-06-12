import { Module } from "@nestjs/common";
import { CreateUserService } from "./services/create-user.service";
import { DeleteUserService } from "./services/delete-user.service";
import { GetUserByIdService } from "./services/get-user-by-id.service";
import { GetUsersService } from "./services/get-users.service";
import { UpdateUserService } from "./services/update-user.service";
import { UserController } from "./user.controller";
import { DatabaseModule } from "src/infra/database/database.module";
import { UserCacheService } from "src/infra/cache/user-cache.service";

@Module({
  imports: [DatabaseModule],
  controllers: [UserController],
  providers: [
    GetUsersService, 
    GetUserByIdService, 
    UpdateUserService, 
    CreateUserService, 
    DeleteUserService,
    UserCacheService,
  ],
})
export class UserModule {}