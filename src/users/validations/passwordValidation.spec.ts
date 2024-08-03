import { passwordIsInvalid } from "./passwordValidation"

describe("Password validation function", () => {
    it("when a password is valid should return false", () => {
        expect(passwordIsInvalid('1231')).toBeTruthy();
    });

    it("when a password is invalid should return false", () => {
        expect(passwordIsInvalid('123746#Ac')).toBeFalsy();
    });
})