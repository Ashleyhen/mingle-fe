import { MingleGroupDto } from "@/protos/protos/mingle_pb";
import { Dayjs } from "dayjs";

type MingleGroupInfo ={
    id: number;
    zip:string;                    // String field for zip
    organizerId: number;          // Many-to-One relationship (referencing MingleUser)
    description:string;            // String field for description
    images:Uint8Array ;                  // Binary field for LOB (Large Object) images
    groupName:string ;
  }

export type LeaguesForm = {
  eventName: string;
  startDate: string;
  endDate: string;
  pricePerPlayer: number;
  description: string;
  duration: string;
  playersPerTeam: number;
  mingleGroupInfo: MingleGroupInfo;
  location: LocationForm[];
  registrationEndDate: string;
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
};

export type TimeSlot = {
  day: string;
  startTime: string;
  endTime: string;
}

export const toMingleGroupInfo = (response:MingleGroupDto)=>{
      return {
          id: response.getId(),
          zip: response.getZip(),
          description: response.getDescription(),
          images: Uint8Array.from(atob(response.getImages_asB64()), c => c.charCodeAt(0)),
          groupName: response.getGroupname(), 
        } as  MingleGroupInfo;
  }

export const toMingleGroupDto = (response:MingleGroupInfo)=>{
      const mingleGroupDto = new MingleGroupDto();
      mingleGroupDto.setId(response.id);
      mingleGroupDto.setZip(response.zip);
      mingleGroupDto.setDescription(response.description);
      // mingleGroupDto.setImages(Uint8Array.from(atob(response.images.toString()), c => c.charCodeAt(0)));
      mingleGroupDto.setGroupname(response.groupName); 
    return mingleGroupDto;
  }

  export default MingleGroupInfo;