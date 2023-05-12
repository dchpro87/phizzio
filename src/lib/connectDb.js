import mongoose from 'mongoose';

const db = process.env.DATABASE_DEV;
const dbPassword = process.env.DATABASE_PASSWORD;
const MONGODB_URI = db.replace('<PASSWORD>', dbPassword);

console.log(MONGODB_URI);

if (!MONGODB_URI) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env.local'
  );
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

const connectDb = async () => {
  console.log('Connecting to mongoDB 💥');
  if (cached.conn) {
    console.log('Already connected to mongoDB 💥');
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
      // bufferCommands: false,
      // bufferMaxEntries: 0,
      // useFindAndModify: false,
      // useCreateIndex: true,
      // strictQuery: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      console.log('Connected to mongoDB 💥');
      return mongoose;
    });
  }
  cached.conn = await cached.promise;
  return cached.conn;
};

export default connectDb;
