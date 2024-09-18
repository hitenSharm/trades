import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { SupabaseService } from 'src/supabase/supabase.service';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: 'hitenSharmaLovesNestJS',
      signOptions: { expiresIn: '10m' },
    }),
  ],
  providers: [AuthService, JwtStrategy, SupabaseService],
  controllers: [AuthController],
})
export class AuthModule {}
