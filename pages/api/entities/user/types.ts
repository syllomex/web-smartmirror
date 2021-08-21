export interface User {
  _id: string;
  googleId?: string;
}

export type CreateUserDTO = Omit<User, '_id'>;