import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { QuoteModule } from './quote/quote.module';
import { Quote } from './quote/entities/quote.entity';
import { EmailService } from './email/email.service';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'database.sqlite',
      entities: [Quote],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Quote]),
    QuoteModule,
  ],
  controllers: [AppController],
  providers: [AppService, EmailService],
})
export class AppModule {}
