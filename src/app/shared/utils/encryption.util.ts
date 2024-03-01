import {Md5} from "ts-md5";
import {HeaderType} from "../../../types/header.type";

export class EncryptionUtil {
  static authHeader(): HeaderType {
    const date: Date = new Date();
    const month: number = date.getUTCMonth() + 1;
    const ciphertext: string = Md5.hashStr('Valantis_' + date.getUTCFullYear().toString() + month.toString().padStart(2, '0') + date.getUTCDate().toString().padStart(2, '0'));
    return {'X-Auth': ciphertext};
  }
}
