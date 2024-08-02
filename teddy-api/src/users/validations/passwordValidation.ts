export const passwordIsInvalid = (password: string): boolean => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z\d])[A-Za-z\d\S]{6,}$/;
    return !regex.test(password);
}