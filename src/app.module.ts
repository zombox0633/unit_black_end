import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HotelController } from './hotel/hotel.controller';
import { HotelService } from './hotel/hotel.service';
import { Hotel } from './hotel/hotel.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'unit_postgres',
      autoLoadEntities: true,
      synchronize: true,
      retryAttempts: 10,
      retryDelay: 3000,
    }),
    TypeOrmModule.forFeature([Hotel]),
  ],
  controllers: [AppController, HotelController],
  providers: [AppService, HotelService],
})
export class AppModule {}
