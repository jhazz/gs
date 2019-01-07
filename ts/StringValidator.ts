export interface StringValidator {
    test: number;
    isAcceptable(s: string): boolean;
}