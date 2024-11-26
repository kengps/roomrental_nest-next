import {
  Controller,
  Post,
  Body,
  UseGuards,
  Request,
  Res,
  Get,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { LocalAuthGuard } from './local-auth.guard';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(
    @Body() body: { username: string; password: string },
    @Res({ passthrough: true }) res,
  ) {
    const user = await this.authService.validateUser(
      body.username,
      body.password,
    );

    if (!user) {
      return { message: 'Invalid credentials' };
    }
    //return this.authService.login(user);

    const { accessToken } = await this.authService.login(user);
    res.cookie('access_token', accessToken, {
      httpOnly: true, // ป้องกันการเข้าถึงจาก JavaScript
      // secure: process.env.NODE_ENV === 'production', // ใช้ secure cookie เฉพาะใน production
      sameSite: 'strict', // ป้องกัน CSRF
    });

    return { message: 'Login successful' };
  }

  @UseGuards(LocalAuthGuard)
  @Get('profile')
  async getProfile(@Request() req) {
    const { accessToken } = await this.authService.login(req.user);
    console.log(
      `⩇⩇:⩇⩇🚨  file: auth.controller.ts:25  accessToken :`,
      accessToken,
    );

    return { accessToken };
  }

  @Post('logout')
  logout(@Res({ passthrough: true }) res:Response) {
    res.clearCookie('access_token'); // ลบคุกกี้ JWT
    return { message: 'Logged out successfully' };
  }
}
