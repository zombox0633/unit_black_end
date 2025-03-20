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
    Data: HotelDto[];
    Dashboard: {
      AllHotel: number;
      Price: {
        High: string;
        Low: string;
      };
      LastHotelAdd: string;
    };
  };
}
