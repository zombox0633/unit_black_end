export class HotelResponseDto<T> {
  RespCode: number;
  RespMessage: string;
  Result: T;
}
