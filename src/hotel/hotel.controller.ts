import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseFilters,
  UseInterceptors,
} from '@nestjs/common';

import { HotelService } from './hotel.service';
import { Hotel } from './hotel.entity';
import { HotelResponseDto } from './dto/Hotel.response.dto';
import { ResponseInterceptor } from 'src/config/response.errorHandling';
import { HttpExceptionFilter } from 'src/config/http-exception.errorHanding';
import { CreateHotelRequestDto } from './dto/CreateHotel.requst.dto';

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

  @Post('/create/hotel')
  async createHotelData(
    @Body() createHotelRequestDto: CreateHotelRequestDto,
  ): Promise<HotelResponseDto<Hotel[]>> {
    // console.log(createHotelRequestDto);
    const response = await this.hotelService.createHotelData(
      createHotelRequestDto.name,
      createHotelRequestDto.price,
    );
    return {
      RespCode: 200,
      RespMessage: 'success',
      Result: [response],
    };
  }
}
