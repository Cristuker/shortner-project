import { emailIsInvalid } from "./emailValidation"

describe("Email validation", () => {
    it("should return false when email is valid", () => {
        expect(emailIsInvalid('test.@org')).toBeTruthy();
    });

    it("should return false when email is valid", () => {
        expect(emailIsInvalid('test@gmail.com')).toBeFalsy();
    });
})