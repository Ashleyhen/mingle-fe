import * as jspb from 'google-protobuf'



export class CredentialsDto extends jspb.Message {
  getEmail(): string;
  setEmail(value: string): CredentialsDto;

  getPassword(): string;
  setPassword(value: string): CredentialsDto;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CredentialsDto.AsObject;
  static toObject(includeInstance: boolean, msg: CredentialsDto): CredentialsDto.AsObject;
  static serializeBinaryToWriter(message: CredentialsDto, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CredentialsDto;
  static deserializeBinaryFromReader(message: CredentialsDto, reader: jspb.BinaryReader): CredentialsDto;
}

export namespace CredentialsDto {
  export type AsObject = {
    email: string,
    password: string,
  }
}

export class MingleUserDto extends jspb.Message {
  getImage(): Uint8Array | string;
  getImage_asU8(): Uint8Array;
  getImage_asB64(): string;
  setImage(value: Uint8Array | string): MingleUserDto;

  getBio(): string;
  setBio(value: string): MingleUserDto;

  getFirstname(): string;
  setFirstname(value: string): MingleUserDto;

  getLastname(): string;
  setLastname(value: string): MingleUserDto;

  getUsername(): string;
  setUsername(value: string): MingleUserDto;

  getZip(): string;
  setZip(value: string): MingleUserDto;

  getEmail(): string;
  setEmail(value: string): MingleUserDto;

  getPassword(): string;
  setPassword(value: string): MingleUserDto;

  getPhone(): string;
  setPhone(value: string): MingleUserDto;

  getRelationship(): string;
  setRelationship(value: string): MingleUserDto;

  getGender(): string;
  setGender(value: string): MingleUserDto;

  getSporttype(): string;
  setSporttype(value: string): MingleUserDto;

  getSkill(): string;
  setSkill(value: string): MingleUserDto;

  getBirthday(): string;
  setBirthday(value: string): MingleUserDto;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): MingleUserDto.AsObject;
  static toObject(includeInstance: boolean, msg: MingleUserDto): MingleUserDto.AsObject;
  static serializeBinaryToWriter(message: MingleUserDto, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): MingleUserDto;
  static deserializeBinaryFromReader(message: MingleUserDto, reader: jspb.BinaryReader): MingleUserDto;
}

export namespace MingleUserDto {
  export type AsObject = {
    image: Uint8Array | string,
    bio: string,
    firstname: string,
    lastname: string,
    username: string,
    zip: string,
    email: string,
    password: string,
    phone: string,
    relationship: string,
    gender: string,
    sporttype: string,
    skill: string,
    birthday: string,
  }
}

export class SuccessMsg extends jspb.Message {
  getMessage(): string;
  setMessage(value: string): SuccessMsg;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SuccessMsg.AsObject;
  static toObject(includeInstance: boolean, msg: SuccessMsg): SuccessMsg.AsObject;
  static serializeBinaryToWriter(message: SuccessMsg, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SuccessMsg;
  static deserializeBinaryFromReader(message: SuccessMsg, reader: jspb.BinaryReader): SuccessMsg;
}

export namespace SuccessMsg {
  export type AsObject = {
    message: string,
  }
}

