import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);

export function formatDateTime(date: Date): string {
  return dayjs.utc(date).tz('Asia/Bangkok').format('YYYY-MM-DD HH:mm:ss');
}
