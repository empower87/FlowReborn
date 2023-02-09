import bcrypt from 'bcrypt';
export const matchPassword = async (enteredPassword, storedPassword) => {
    return await bcrypt.compare(enteredPassword, storedPassword);
};
export const hashPassword = async (password) => {
    return bcrypt.hash(password, 10);
};
//# sourceMappingURL=bcrypt.js.map