import models, { User, UserInput } from '../models';

/**
 *
 * @param input - data is obtained from the request body and is of UserInput type
 * @returns A promise of the User
 */
const create = async (input: UserInput) => {
  try {
    return await models.User.create(input);
  } catch (error: any) {
    throw new Error(error);
  }
};

/**
 * determine if the user exists by searching for them by email
 *
 * @param email - is the unique input in the database used to find the user
 * @returns - false if user does not exist and true otherwise
 *
 * TODO: do I actually need this function?
 */
const exists = async (email: string): Promise<boolean> => {
  try {
    const userExists = await models.User.findOne({ email: email });

    if (!userExists) return false;

    return true;
  } catch (error: any) {
    throw new Error(error);
  }
};

/**
 * retrieve the user by their email
 *
 * @param email - is the unique input in the database used to retrieve the user
 * @returns - a Promise with the User info or null if an error occurs
 */
const getByEmail = async (email: string): Promise<User | null> => {
  try {
    return await models.User.findOne({ email: email });
  } catch (error: any) {
    throw new Error(error);
  }
};

// TODO: get all users
// TODO: update a user

export default { create, exists, getByEmail };
