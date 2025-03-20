import { Controller, Get, Param } from '@nestjs/common';
import { HotelService } from './hotel.service';
import { Hotel } from './hotel.entity';
import { HotelResponseDto } from './dto/HotelResponseDto';

@Controller('api/listhotel')
export class HotelController {
  constructor(private readonly hotelService: HotelService) {}

  @Get()
  async getListHotel(): Promise<HotelResponseDto<Hotel[]>> {
    const listHotel = await this.hotelService.getListHotel();
    return {
      RespCode: 200,
      RespMessage: 'success',
      Result: listHotel,
    };
  }

  @Get('/:id')
  async getHotelById(
    @Param('id') id: number,
  ): Promise<HotelResponseDto<Hotel[]>> {
    const hotelData = await this.hotelService.getHotelByID(id);
    return {
      RespCode: 200,
      RespMessage: 'success',
      Result: [hotelData],
    };
  }
}
