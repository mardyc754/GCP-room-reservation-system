import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from '@/schemas/user';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @HttpCode(201)
  @Post('/signup')
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(
      createUserDto.email,
      createUserDto.password,
      createUserDto.username,
    );
  }

  @Get(':id')
  getUserById(@Param('id', ParseIntPipe) id: number) {
    return this.userService.getUserById(id);
  }
}
