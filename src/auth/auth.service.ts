import {
  BadRequestException,
  ConflictException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SupabaseService } from 'src/supabase/supabase.service';
import { UserDTO } from './dto/user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly supabaseService: SupabaseService,
    private readonly jwtService: JwtService,
  ) {}

  async emailExists(email: string): Promise<any> {
    const { data, error } = await this.supabaseService
      .getSupaClient()
      .from('users')
      .select('*')
      .eq('email', email)
      .single();

    if (data) return data;

    return null;
  }

  async signupUser(createUserDTO: UserDTO) {
    const { email, password } = createUserDTO;

    if (await this.emailExists(email)) {
      throw new ConflictException('Email already exists');
    }

    const hashedPwd = await bcrypt.hash(password, 10);

    const { error } = await this.supabaseService
      .getSupaClient()
      .from('users')
      .insert([{ email, password: hashedPwd }]);

    if (error) {
      throw new Error('Sign up could not happen');
    }

    return {
      statusCode: HttpStatus.CREATED,
      message: 'User created, please login!',
    };
  }

  async loginUser(loginUserDTO: UserDTO) {
    const { email, password } = loginUserDTO;

    //validate the email.
    const data = await this.emailExists(email);

    if (!data) {
      throw new BadRequestException('Invalid user, email not found');
    }

    const passwordMatch = await bcrypt.compare(password, data.password);

    if (!passwordMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { sub: data.id, email: data.email };
    const accessToken = this.jwtService.sign(payload, { expiresIn: '10m' });
    const refreshToken = this.jwtService.sign(payload, { expiresIn: '7d' });

    return { accessToken, refreshToken };
  }

  async refreshToken(token: string) {
    try {
      const payload = this.jwtService.verify(token);
      const newAccessToken = this.jwtService.sign(
        { sub: payload.sub, email: payload.email },
        { expiresIn: '10m' },
      );

      return { accessToken: newAccessToken };
    } catch (e) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }
}
