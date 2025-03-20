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
import { HotelResponseDto } from './dto/hotel.response.dto';
import { ResponseInterceptor } from 'src/config/response.errorHandling';
import { HttpExceptionFilter } from 'src/config/http-exception.errorHanding';
import {
  CreateHotelRequestDto,
  SearchHotelByDateRequestDto,
} from './dto/hotel.requst.dto';

@Controller('api')
@UseInterceptors(ResponseInterceptor)
@UseFilters(HttpExceptionFilter)
export class HotelController {
  constructor(private readonly hotelService: HotelService) {}

  @Get('/listhotel')
  async getListHotel(): Promise<HotelResponseDto<Hotel[]>> {
    const response = await this.hotelService.getListHotel();
    return {
      RespCode: 200,
      RespMessage: 'success',
      Result: response,
    };
  }

  @Get('/listhotel/:id')
  async getHotelById(
    @Param('id') id: number,
  ): Promise<HotelResponseDto<Hotel[]>> {
    const response = await this.hotelService.getHotelByID(id);
    return {
      RespCode: 200,
      RespMessage: 'success',
      Result: [response],
    };
  }

  @Post('/create/hotel')
  async createHotelData(
    @Body() createHotelRequestDto: CreateHotelRequestDto,
  ): Promise<HotelResponseDto<Hotel[]>> {
    // console.log(createHotelRequestDto);
    const response = await this.hotelService.createHotelData(
      createHotelRequestDto,
    );
    return {
      RespCode: 200,
      RespMessage: 'success',
      Result: [response],
    };
  }

  @Post('/search/hotel')
  async searchHotelByDate(
    @Body() searchHotelByDateRequestDto: SearchHotelByDateRequestDto,
  ): Promise<HotelResponseDto<Hotel[]>> {
    console.log(searchHotelByDateRequestDto);

    const response = await this.hotelService.searchHotelByDate(
      searchHotelByDateRequestDto,
    );

    return {
      RespCode: 200,
      RespMessage: 'success',
      Result: response,
    };
  }
}
