import { MongoClient } from "mongodb"

const uri = process.env.MONGODB_URI
const dbName = process.env.MONGODB_DB || "fabricdb"

if (!uri) {
  throw new Error("MONGODB_URI environment variable is not set")
}

let clientPromise

// Use a global to cache the client in development to avoid exhausting connections
if (!globalThis._mongoClientPromise) {
  const client = new MongoClient(uri)
  // connect and log once when connection is established
  globalThis._mongoClientPromise = client.connect().then((c) => {
    try {
      // Only log once per process
      console.log("MongoDB: connected to", dbName)
    } catch (e) {
      // ignore logging errors
    }
    return c
  })
}
clientPromise = globalThis._mongoClientPromise

export async function getDb() {
  const client = await clientPromise
  return client.db(dbName)
}

export default getDb
