import { MingleUserDto } from "@/protos/protos/user_pb";
import MingleUserInfo from "../types/MingleUserInfo";

export class AccountInfoCacheService {
  static set(mingleUserInfo: MingleUserInfo) {
    localStorage.setItem("accountInfo", JSON.stringify(mingleUserInfo)); // Cache the data
  }
  static get(): MingleUserInfo {
    return JSON.parse(
      localStorage.getItem("accountInfo") || "{}"
    ) as MingleUserInfo; // Cache the data
  }
}
