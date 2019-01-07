import {StringValidator} from "./StringValidator"
export const numberRegexp = /^[0-9]+$/;

export class ZipCodeValidator implements StringValidator {
    test:number;
    isAcceptable(s: string) {
        return s.length === 5 && numberRegexp.test(s);
    }
}