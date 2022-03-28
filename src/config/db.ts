import mongoose from 'mongoose';

/**
 * connect to the database
 */
const connect = async () => {
  const mongoUri: string = process.env.MONGO_URI_LOCAL || '';

  try {
    const conn = await mongoose.connect(mongoUri);
    console.log(`MONGOOSE: database connected to ${conn.connection.host}`);
  } catch (error) {
    console.error('Unable to connect to the database');
    process.exit(1);
  }
};

export default { connect };
