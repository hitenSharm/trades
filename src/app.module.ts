import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SupabaseService } from './supabase/supabase.service';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [AppController],
  providers: [AppService, SupabaseService],
})
export class AppModule {}
