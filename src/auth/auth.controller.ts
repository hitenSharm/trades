import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserDTO } from './dto/user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-up')
  async signUp(@Body() userDTO: UserDTO) {
    return this.authService.signupUser(userDTO);
  }

  @Post('login')
  async loginUser(@Body() userDTO: UserDTO) {
    return this.authService.loginUser(userDTO);
  }

  @Post('refrest-jwt-token')
  async refreshUserToken(@Body() body: { token: string }) {
    return this.authService.refreshToken(body.token);
  }
}
