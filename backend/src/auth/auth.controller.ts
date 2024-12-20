import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  UseGuards,
  Request as Req,
  Get,
  Res,
} from '@nestjs/common';
import { Request, Response } from 'express';

import { SignInDto } from '@/schemas/auth';

import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { User } from '@/db/schema';
import { UserService } from '@/user/user.service';
import { CreateUserDto } from '@/schemas/user';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Post('/sign-in')
  async signIn(
    @Body() signInDto: SignInDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const { authToken, ...user } = await this.authService.signIn(
      signInDto.email,
      signInDto.password,
    );

    response.cookie('authToken', authToken, {
      httpOnly: true,
      expires: new Date(Date.now() + 2 * 60 * 60 * 1000),
      secure: true,
      sameSite: 'none',
    });

    response.status(200).send(user);
  }

  @HttpCode(201)
  @Post('/sign-up')
  signUp(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(
      createUserDto.email,
      createUserDto.password,
      createUserDto.username,
    );
  }

  @UseGuards(AuthGuard)
  @Get('user')
  getCurrentUser(@Req() req: Request & { user: Omit<User, 'password'> }) {
    return {
      id: req.user.id,
      email: req.user.email,
      username: req.user.username,
    };
  }

  @UseGuards(AuthGuard)
  @Post('sign-out')
  signOut(@Req() req: Request, @Res({ passthrough: true }) response: Response) {
    response.cookie('authToken', '', {
      httpOnly: true,
      expires: new Date(0),
      secure: true,
      sameSite: 'none',
    });
    response.status(200).send({ message: 'Signed out' });
  }
}
