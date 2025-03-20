import { Type } from 'class-transformer';
import { IsString, IsNumber, IsNotEmpty, IsDate } from 'class-validator';

export class CreateHotelRequestDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;
}

export class SearchHotelByDateRequestDto {
  @IsDate()
  @IsNotEmpty()
  @Type(() => Date)
  date: Date;
}
