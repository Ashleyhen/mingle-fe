import { Dayjs } from 'dayjs';

export type LeaguesForm = {
  eventName: string;
  startDate: Dayjs;
  endDate: Dayjs;
  pricePerPlayer: number;
  description: string;
  duration: string;
  playersPerTeam: number;
  location: LocationForm[];
};

export type LocationForm = {
  hostEmail: string;
  hostName: string;
  locationAddress: string;
  zipCode: string;
  name: string;
  description: string;
  photos: string[];
  times: TimeSlot[];
  newTimeSlot?: TimeSlot;
};
export type TimeSlot = {
  day: string;
  startTime: string;
  endTime: string;
};