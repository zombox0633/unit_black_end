import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Hotel } from './hotel.entity';
import { Repository } from 'typeorm';

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
}
