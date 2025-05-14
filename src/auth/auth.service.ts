import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { LoginUserDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
  ) {}

  async login(loginUserDto: LoginUserDto) {
    const user = await this.userService.validateUser(
      loginUserDto.email,
      loginUserDto.password,
    );

    if (!user) return null;

    const payload = { username: user.email, sub: user.id };
    return { access_token: this.jwtService.sign(payload) };
  }
}
