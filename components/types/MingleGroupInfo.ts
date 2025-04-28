import { MingleGroupDto } from "@/protos/protos/group_pb";

type MingleGroupInfo ={
    id: number;
    zip:string;                    // String field for zip
    organizerId: number;          // Many-to-One relationship (referencing MingleUser)
    description:string;            // String field for description
    images:Uint8Array ;                  // Binary field for LOB (Large Object) images
    groupName:string ;
  }

export const toMingleGroupInfo = (response:MingleGroupDto)=>{
      return {
          id: response.getId(),
          zip: response.getZip(),
          organizerId: response.getOrganizerid(),
          description: response.getDescription(),
          images: Uint8Array.from(atob(response.getImages_asB64()), c => c.charCodeAt(0)),
          groupName: response.getGroupname(), 
        } as  MingleGroupInfo;
  }

export const toMingleGroupDto = (response:MingleGroupInfo)=>{
      const mingleGroupDto = new MingleGroupDto();
      mingleGroupDto.setId(response.id);
      mingleGroupDto.setZip(response.zip);
      mingleGroupDto.setOrganizerid(response.organizerId);
      mingleGroupDto.setDescription(response.description);
      // mingleGroupDto.setImages(Uint8Array.from(atob(response.images.toString()), c => c.charCodeAt(0)));
      mingleGroupDto.setGroupname(response.groupName); 
    return mingleGroupDto;
  }

  export default MingleGroupInfo;