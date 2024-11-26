// import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
// import { JwtService } from '@nestjs/jwt';

// @Injectable()
// export class AuthService {
//   constructor(
//     private usersService: UsersService,
//     private jwtService: JwtService,
//   ) {}
//   async validateUser(username: string, pass: string): Promise<any> {
//     const user = await this.usersService.findByUsername(username);
//     console.log(`⩇⩇:⩇⩇🚨  file: auth.service.ts:9  user :`, user);

//     if (user && (await bcrypt.compare(pass, user.password))) {
//       const { password, ...result } = user.toObject();
//       return result;
//     }
//     return null;
//   }

//   async login(user: any) {
//     const payload = { email: user.email, sub: user.userId };
//     return {
//       access_token: this.jwtService.sign(payload),
//     };
//   }
// }

import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private usersService: UsersService,
  ) {}

  async login(user: any) {
   
    const payload = { username: user.username, sub: user.id };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }


  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findByUsername(username);

    const hashPassword = await bcrypt.compare(password, user.password);

    if (user && hashPassword) {
      const { password, ...result } = user;
     
      return result;
    }
    return null;
  }
}
