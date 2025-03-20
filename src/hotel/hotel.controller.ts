import { Controller, Get, Param } from '@nestjs/common';
import { HotelService } from './hotel.service';
import { Hotel } from './hotel.entity';

@Controller('api/listhotel')
export class HotelController {
  constructor(private readonly hotelService: HotelService) {}

  @Get()
  async getListHotel(): Promise<Hotel[]> {
    return this.hotelService.getListHotel();
  }

  @Get('/:id')
  async getHotelById(@Param('id') id: number): Promise<Hotel> {
    return this.hotelService.getHotelByID(id);
  }
}
