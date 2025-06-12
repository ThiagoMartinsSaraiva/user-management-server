import { Body, Controller, Delete, Get, Param, Post, Put, Res } from "@nestjs/common";
import { FastifyReply } from "fastify";
import { GetUsersService } from "./services/get-users.service";
import { GetUserByIdService } from "./services/get-user-by-id.service";
import { CreateUserService } from "./services/create-user.service";
import { UpdateUserService } from "./services/update-user.service";
import { DeleteUserService } from "./services/delete-user.service";
import { CreateUserDTO } from "./dtos/create-user.dto";
import { UpdateUserDTO } from "./dtos/update-user.dto";

@Controller('user')
export class UserController {
  constructor(
    private readonly getAllUsersService: GetUsersService,
    private readonly getUserByIdService: GetUserByIdService,
    private readonly createUserService: CreateUserService,
    private readonly updateUserService: UpdateUserService,
    private readonly deleteUserService: DeleteUserService,
  ) {}

  @Get('')
  async getUsers(@Res() response: FastifyReply) {
    const users = await this.getAllUsersService.run()
    return response.status(200).send({ users })
  }

  @Post('')
  async createUser(@Body() userPayload: CreateUserDTO, @Res() response: FastifyReply) {
    const createdUser = await this.createUserService.run(userPayload)
    return response.status(201).send({ user: createdUser })
  }

  @Get(':userId')
  async getUserById(@Param('userId') userId: string, @Res() response: FastifyReply) {
    const user = await this.getUserByIdService.run(userId)

    if (!user) {
      return response.status(404).send({ message: 'User not found' })
    }

    return response.status(200).send({ user })
  }

  @Put(':userId')
  async updateUser(@Param('userId') userId: string, @Body() userPayload: UpdateUserDTO, @Res() response: FastifyReply) {
    const updatedUser = await this.updateUserService.run(userId, userPayload)

    if (!updatedUser) {
      return response.status(404).send({ message: 'User not found' })
    }

    return response.status(200).send({ user: updatedUser })
  }

  @Delete(':userId')
  async deleteUser(@Param('userId') userId: string, @Res() response: FastifyReply) {
    const deletedUser = await this.deleteUserService.run(userId)

    if (!deletedUser) {
      return response.status(404).send({ message: 'User not found' })
    }

    return response.status(204).send({ user: deletedUser })
  }

}