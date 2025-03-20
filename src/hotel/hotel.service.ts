import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Hotel } from './hotel.entity';
import { Repository } from 'typeorm';
import {
  CreateHotelRequestDto,
  SearchHotelByDateRequestDto,
} from './dto/hotel.request.dto';
import { HotelDashboardDto } from './dto/hotel.response.dto';

@Injectable()
export class HotelService {
  constructor(
    @InjectRepository(Hotel)
    private readonly hotelRepository: Repository<Hotel>,
  ) {}

  async getListHotel(): Promise<Hotel[]> {
    return this.hotelRepository.find();
  }

  async getHotelByID(id: number): Promise<Hotel> {
    const hotel = await this.hotelRepository.findOne({ where: { id } });

    if (!hotel) throw new NotFoundException(`Hotel with ID ${id} is not found`);

    return hotel;
  }

  async createHotelData(
    createHotelRequestDto: CreateHotelRequestDto,
  ): Promise<Hotel> {
    const newHotel = this.hotelRepository.create({
      name: createHotelRequestDto.name,
      price: createHotelRequestDto.price,
    });
    return this.hotelRepository.save(newHotel);
  }

  async searchHotelByDate(
    searchHotelByDateRequestDto: SearchHotelByDateRequestDto,
  ): Promise<Hotel[]> {
    const { date } = searchHotelByDateRequestDto;

    const searchDate = new Date(date);
    if (isNaN(searchDate.getTime())) {
      throw new BadRequestException('Invalid date format');
    }
    const formattedDate = searchDate.toISOString().split('T')[0];

    const hotel = await this.hotelRepository
      .createQueryBuilder('hotel')
      .where('Date(hotel.doingtime) = :searchDate', {
        searchDate: formattedDate,
      })
      .getMany();

    if (hotel.length === 0) {
      throw new NotFoundException(`No hotels available on ${formattedDate}`);
    }

    return hotel;
  }

  async getHotelDashboard(): Promise<HotelDashboardDto> {
    const hotelData = await this.hotelRepository.find();
    const sortHotel = hotelData.sort((a, b) => a.price - b.price);
    const lastAddedHotel = hotelData.reduce((prev, curr) =>
      prev.doingtime > curr.doingtime ? prev : curr,
    );

    return {
      RespCode: 200,
      RespMessage: 'success',
      Result: {
        Data: hotelData,
        Dashboard: {
          AllHotel: hotelData.length,
          Price: {
            High: sortHotel[sortHotel.length - 1].name,
            Low: sortHotel[0].name,
          },
          LastHotelAdd: lastAddedHotel.doingtime,
        },
      },
    };
  }
}
