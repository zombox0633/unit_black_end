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
import { HotelDashboardDto, HotelDto } from './dto/hotel.response.dto';
import { formatDateTime } from 'src/utils/utils';

@Injectable()
export class HotelService {
  constructor(
    @InjectRepository(Hotel)
    private readonly hotelRepository: Repository<Hotel>,
  ) {}

  async getListHotel(): Promise<HotelDto[]> {
    const hotelData = await this.hotelRepository.find();

    return hotelData.map((hotel) => ({
      ...hotel,
      doingtime: formatDateTime(hotel.doingtime),
    }));
  }

  async getHotelByID(id: number): Promise<HotelDto> {
    const hotel = await this.hotelRepository.findOne({ where: { id } });

    if (!hotel) throw new NotFoundException(`Hotel with ID ${id} is not found`);

    return {
      ...hotel,
      doingtime: formatDateTime(hotel.doingtime),
    };
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
  ): Promise<HotelDto[]> {
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

    return hotel.map((hotel) => ({
      ...hotel,
      doingtime: formatDateTime(hotel.doingtime),
    }));
  }

  async getHotelDashboard(): Promise<HotelDashboardDto> {
    const hotelData = await this.hotelRepository.find();
    const mapHotelData = hotelData.map((hotel) => ({
      ...hotel,
      doingtime: formatDateTime(hotel.doingtime),
    }));

    const sortHotel = mapHotelData.sort((a, b) => a.price - b.price);
    const lastAddedHotel = mapHotelData.reduce((prev, curr) =>
      prev.doingtime > curr.doingtime ? prev : curr,
    );

    return {
      RespCode: 200,
      RespMessage: 'success',
      Result: {
        Data: mapHotelData,
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
