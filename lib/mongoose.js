import mongoose from "mongoose"

const uri = process.env.MONGODB_URI

if (!uri) {
  throw new Error("MONGODB_URI environment variable is not set for mongoose")
}

let cached = global.mongoose

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null }
}

export async function connectMongoose() {
  if (cached.conn) {
    return cached.conn
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(uri, { dbName: process.env.MONGODB_DB || undefined }).then((m) => {
      try {
        console.log("Mongoose: connected to", process.env.MONGODB_DB || m.connection.name || "default DB")
      } catch (e) {
        // ignore logging errors
      }
      return m
    })
  }
  cached.conn = await cached.promise
  return cached.conn
}

export default connectMongoose
