import mongoose from 'mongoose';
const { Schema, Types, model } = mongoose;

export type UserInput = Omit<User, 'createdAt' | 'updatedAt'>;

export interface User {
  _id: Types.ObjectId;
  email: string;
  name: string;
  password: string;
  isAdmin?: boolean;
  createAt: Date;
  updatedAt: Date;
}

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

export default model<User>('User', userSchema);
