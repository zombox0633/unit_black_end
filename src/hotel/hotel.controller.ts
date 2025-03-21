import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  UseFilters,
  UseInterceptors,
} from '@nestjs/common';

import { HotelService } from './hotel.service';
import { Hotel } from './hotel.entity';
import {
  HotelDashboardDto,
  HotelDto,
  HotelResponseDto,
} from './dto/hotel.response.dto';
import { ResponseInterceptor } from 'src/config/response.errorHandling';
import { HttpExceptionFilter } from 'src/config/http-exception.errorHanding';
import {
  CreateHotelRequestDto,
  SearchHotelByDateRequestDto,
} from './dto/hotel.request.dto';

@Controller('api')
@UseInterceptors(ResponseInterceptor)
@UseFilters(HttpExceptionFilter)
export class HotelController {
  constructor(private readonly hotelService: HotelService) {}

  @Get('/listhotel')
  async getListHotel(): Promise<HotelResponseDto<HotelDto[]>> {
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
  ): Promise<HotelResponseDto<HotelDto[]>> {
    const response = await this.hotelService.getHotelByID(id);
    return {
      RespCode: 200,
      RespMessage: 'success',
      Result: [response],
    };
  }

  @Post('/create/hotel')
  @HttpCode(200)
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
  @HttpCode(200)
  async searchHotelByDate(
    @Body() searchHotelByDateRequestDto: SearchHotelByDateRequestDto,
  ): Promise<HotelResponseDto<HotelDto[]>> {
    // console.log(searchHotelByDateRequestDto);

    const response = await this.hotelService.searchHotelByDate(
      searchHotelByDateRequestDto,
    );

    return {
      RespCode: 200,
      RespMessage: 'success',
      Result: response,
    };
  }

  @Get('/dashboard/hotel')
  async getHotelDashboard(): Promise<HotelDashboardDto> {
    const response = await this.hotelService.getHotelDashboard();
    return response;
  }
}
