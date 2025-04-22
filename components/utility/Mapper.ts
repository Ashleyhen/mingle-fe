import { MingleUserDto } from "@/protos/protos/user_pb";
import MingleUserInfo from "../types/MingleUserInfo";
import { min } from "rxjs";
import dayjs, { Dayjs } from "dayjs";

export const toMingleUserInfo = (response:MingleUserDto)=>{
      return {
          id: response.getId(),
          email: response.getEmail(),
          password: response.getPassword(),
          image: Uint8Array.from(atob(response.getImage_asB64()), c => c.charCodeAt(0)),
          birthday: birthdayToDaysJs(response.getBirthday()),
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
    mingleUserDto.setBirthday(response.birthday ? birthdayToString(response.birthday) : "");
    return mingleUserDto;
  }
export const birthdayToString = (date: Dayjs): string => {
    return date.format("MM-DD-YYYY"); // Format as MM-DD-YYYY
};

export const birthdayToDaysJs = (dateString: string): Dayjs => {
  return dayjs(dateString, "MM-DD-YYYY"); // Parse the date string using the specified format
};