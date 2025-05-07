enum Relationship {
    S = "S",
    R = "R",
  }
  
  enum Gender {
    M = "M",
    F = "F",
  }
  
  enum Skill {
    BEGINNER = "BEGINNER",
    INTERMEDIATE = "INTERMEDIATE",
    ADVANCED = "ADVANCED",
  }
  
  
  enum SportType {
    COED='COED',EXCLUSIVE='EXCLUSIVE'
  }
  
import dayjs, { Dayjs } from 'dayjs';
import { toDayJs, dateToString } from '../utility/MingleFormat';
import { MingleGroupDto, MingleUserDto } from '@/protos/protos/mingle_pb';
import MingleGroupInfo, { toMingleGroupInfo } from './MingleGroupInfo';
  
  type MingleUserInfo ={
    id?: number; // Not nullable
    image?: Uint8Array
    bio?: string; // Optional since @Column(length = 500) isn't nullable
    firstname: string; // Not nullable
    lastname: string; // Not nullable
    username: string; // Unique and not nullable
    password: string; // Not nullable
    zip: string; // Short can be represented as a number, optional
    email: string; // Unique and not nullable
    phone: string; // Optional since it's not marked nullable
    relationship?: Relationship; // Enum
    gender?: Gender; // Enum
    skill?: Skill; // Enum
    birthday?: Dayjs; // Enum
    sporttype?: SportType; // Enum
    mingleGroup: MingleGroupInfo[]; // One-to-Many relationship
  }
export const toMingleUserInfo = (response:MingleUserDto)=>{
      return {
          id: response.getId(),
          email: response.getEmail(),
          password: response.getPassword(),
          image: Uint8Array.from(atob(response.getImage_asB64()), c => c.charCodeAt(0)),
          birthday: toDayJs(response.getBirthday()),
          bio: response.getBio(),
          firstname: response.getFirstname(),
          lastname: response.getLastname(),
          username: response.getUsername(),
          zip: response.getZip(),
          phone: response.getPhone(),
          relationship: response.getRelationship(),
          skill: response.getSkill(),
          sporttype: response.getSporttype(),
          gender: response.getGender(),
          mingleGroup: response.getMinglegroupdtoList().map((group: MingleGroupDto) =>
            toMingleGroupInfo(group) // Convert each MingleGroupDto to MingleGroupInfo
          )
        } as  MingleUserInfo;
  }

export const toMingleUserDto = (response:MingleUserInfo)=>{
    const mingleUserDto =  new MingleUserDto();
    mingleUserDto.setId(response.id ?? 0); // Provide a default value of 0 if response.id is undefined
    mingleUserDto.setEmail(response.email);
    mingleUserDto.setPassword(response.password);
    mingleUserDto.setImage(
      response.image && response.image instanceof Uint8Array
        ? btoa(String.fromCharCode(...response.image))
        : ""
    );
    mingleUserDto.setBio(response.bio || "");
    mingleUserDto.setFirstname(response.firstname);
    mingleUserDto.setLastname(response.lastname);
    mingleUserDto.setUsername(response.username);
    mingleUserDto.setZip(response.zip || "");
    mingleUserDto.setPhone(response.phone || "");
    mingleUserDto.setRelationship(response.relationship || "");
    mingleUserDto.setGender(response.gender || "");
    mingleUserDto.setSporttype(response.sporttype || "");
    mingleUserDto.setSkill(response.skill || "");
    mingleUserDto.setBirthday(response.birthday ? dateToString(response.birthday) : "");
    return mingleUserDto;
  }
  export default MingleUserInfo;
  export { Relationship, Skill, Gender,SportType};