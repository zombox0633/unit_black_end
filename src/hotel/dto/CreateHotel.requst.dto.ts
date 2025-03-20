import { IsString, IsNumber, IsNotEmpty } from 'class-validator';

export class CreateHotelRequestDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;
}
