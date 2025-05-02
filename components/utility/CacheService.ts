import { MingleUserDto } from "@/protos/protos/mingle_pb";
import MingleUserInfo from "../types/MingleUserInfo";
import { min } from "rxjs";
import { Buffer } from "buffer";

export class MingleCacheService {
  static set(mingleUserDto: MingleUserDto) {
    localStorage.setItem("accountInfo", btoa(String.fromCharCode(...mingleUserDto.serializeBinary()))); // Cache the data
  }

  static get(): MingleUserDto {
        const serializable=localStorage.getItem("accountInfo") || ""
        const decodedBinary = Buffer.from(serializable, 'base64');
                // Step 2: Deserialize rpc.Status
        return MingleUserDto.deserializeBinary(decodedBinary);
    }
 }