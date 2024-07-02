import dayjs from "dayjs";
import { DEFAULT_DATE_FORMAT } from "~/constant";

export function formatDate(date: string | Date | dayjs.Dayjs, format?: string) {
  return dayjs(date).format(format || DEFAULT_DATE_FORMAT);
}
