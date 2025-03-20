import {
  Controller,
  Get,
  Param,
  UseFilters,
  UseInterceptors,
} from '@nestjs/common';

import { HotelService } from './hotel.service';
import { Hotel } from './hotel.entity';
import { HotelResponseDto } from './dto/HotelResponseDto';
import { ResponseInterceptor } from 'src/utils/response.errorHandling';
import { HttpExceptionFilter } from 'src/utils/http-exception.errorHanding';

@Controller('api')
@UseInterceptors(ResponseInterceptor)
@UseFilters(HttpExceptionFilter)
export class HotelController {
  constructor(private readonly hotelService: HotelService) {}

  @Get('/listhotel')
  async getListHotel(): Promise<HotelResponseDto<Hotel[]>> {
    const listHotel = await this.hotelService.getListHotel();
    return {
      RespCode: 200,
      RespMessage: 'success',
      Result: listHotel,
    };
  }

  @Get('/listhotel/:id')
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
