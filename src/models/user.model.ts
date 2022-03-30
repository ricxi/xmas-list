import { Types, Schema, model } from 'mongoose';

// TODO: should I move all my types and interfaces into a separate file?
export type UserInput = Omit<User, 'createdAt' | 'updatedAt'>;

// TODO: should I move all my types and interfaces into a separate file?
export interface User {
  _id?: Types.ObjectId;
  email: string;
  name: string;
  password: string;
  isAdmin?: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// create a user schema
const userSchema = new Schema<User>(
  {
    name: {
      type: String,
      required: [true, 'please add a name'],
    },
    email: {
      type: String,
      required: [true, 'please add an email'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'please add a password'],
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// export user model
export default model<User>('User', userSchema);
