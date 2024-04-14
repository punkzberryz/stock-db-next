import { format } from "date-fns";
export const formatDateString = (
  date: string | number | Date,
  {
    excludeDay,
  }: {
    excludeDay?: boolean;
  } = { excludeDay: false }
) => {
  if (excludeDay) {
    return format(date, "yyyy-MM");
  }
  return format(date, "yyyy-MM-dd");
};
