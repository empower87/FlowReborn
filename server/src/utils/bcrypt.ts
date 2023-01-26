import bcrypt from 'bcrypt'

export const matchPassword = async (enteredPassword: string, storedPassword: string) => {
  return await bcrypt.compare(enteredPassword, storedPassword)
}

export const hashPassword = async (password: string) => {
  return bcrypt.hash(password, 10)
}
