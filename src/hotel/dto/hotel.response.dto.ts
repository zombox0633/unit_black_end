import { Hotel } from '../hotel.entity';

export class HotelDto {
  id: number;
  name: string;
  price: number;
  doingtime: string;
}

export class HotelResponseDto<T> {
  RespCode: number;
  RespMessage: string;
  Result: T;
}

export class HotelDashboardDto {
  RespCode: number;
  RespMessage: string;
  Result: {
    Data: Hotel[];
    Dashboard: {
      AllHotel: number;
      Price: {
        High: string;
        Low: string;
      };
      LastHotelAdd: Date;
    };
  };
}
