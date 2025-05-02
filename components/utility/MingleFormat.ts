
import dayjs, { Dayjs } from "dayjs";

const FORMAT = "YYYY-MM-DD";

export const dateToString = (date: Dayjs): string => {
    return date.format(FORMAT); // Format as YYYY-MM-DD
};

export const toDayJs = (dateString: string): Dayjs => {
    return dayjs(dateString, FORMAT); // Parse the date string using the specified format
};

export const toYYYYMMDD = (dateString: string): string => {
    return  dayjs(dateString).format(FORMAT) // Ensure input is in MM-DD-YYYY format
};