import { MongoClient } from "mongodb"

const uri = process.env.MONGODB_URI
const dbName = process.env.MONGODB_DB || "User_Information"

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

/**
 * Get a MongoDB Database handle.
 * If `dbNameOverride` is provided, it will be used instead of the default `dbName`.
 * Use an override when you want to target a different database (e.g. per-folder or per-user DB).
 */
export async function getDb(dbNameOverride) {
  const client = await clientPromise
  const name = dbNameOverride || dbName
  return client.db(name)
}

/**
 * Convenience helper to get a collection from the (optionally overridden) database.
 */
export async function getCollection(collectionName, dbNameOverride) {
  const db = await getDb(dbNameOverride)
  return db.collection(collectionName)
}

export default getDb

/* Usage examples and recommendations:

1) Store fabrics in a shared DB/collection with a `folder` field:

const fabrics = await getCollection('fabrics')
await fabrics.insertOne({
  ownerId: userId,
  folder: 'userA/wardrobe', // logical folder name
  name: 'Blue Cotton',
  metadata: { color: 'blue', weight: 200 },
  createdAt: new Date()
})

Index suggestion: create an index on { ownerId: 1, folder: 1 } for fast folder lookups.

2) If you want a separate database per folder (less common):

const db = await getDb('Fabrics_userA_folder1')
const fabrics = db.collection('items')

3) For large binary files (images, PDFs), consider using GridFS rather than storing binaries inline.

*/

/**
 * Helper: return a collection name safe for use when mapping folders to collections.
 */
function sanitizeName(name) {
  return String(name).replace(/[^a-zA-Z0-9_\-]/g, '_')
}

/**
 * Get a collection that represents a logical "folder".
 * Two approaches supported:
 *  - Separate collections per folder: collectionName_folderName
 *  - Single collection with a `folder` field (recommended for many folders)
 *
 * By default this returns the physical collection for the separate-collection approach.
 */
export async function getFolderCollection(baseCollection, folderName, dbNameOverride) {
  const safe = sanitizeName(folderName || 'default')
  const collectionName = `${baseCollection}_${safe}`
  return getCollection(collectionName, dbNameOverride)
}

/**
 * Convenience for fabrics-specific storage. `type` can be e.g. 'regular', 'heat_setting', 'padding'.
 * Choose `separateCollections=true` to store each type in its own collection, otherwise use
 * a single `fabrics` collection with a `type` field (recommended for querying across types).
 */
export async function getFabricsCollection(type = 'regular', options = {}) {
  const { separateCollections = false, dbNameOverride } = options
  if (separateCollections) {
    return getFolderCollection('fabrics', type, dbNameOverride)
  }
  return getCollection('fabrics', dbNameOverride)
}

/**
 * Ensure indexes on a collection. `indexes` should be an array of { keys, options } entries.
 * Example: ensureIndexes('fabrics', [ { keys: { ownerId: 1, folder: 1 } } ])
 */
export async function ensureIndexes(collectionName, indexes = [], dbNameOverride) {
  const col = await getCollection(collectionName, dbNameOverride)
  for (const idx of indexes) {
    const keys = idx.keys || idx
    const options = idx.options || {}
    await col.createIndex(keys, options)
  }
}

/* Example usage:

// 1) Single collection (recommended when you have many folders/types):
const fabrics = await getFabricsCollection()
await fabrics.insertOne({ ownerId: userId, type: 'regular', folder: 'wardrobe', name: 'Blue Cotton' })

// 2) Separate collections per type (only if you need strict separation):
const regular = await getFabricsCollection('regular', { separateCollections: true })
await regular.insertOne({ ownerId: userId, name: 'Blue Cotton' })

// Ensure index on shared collection
await ensureIndexes('fabrics', [ { keys: { ownerId: 1, type: 1 } } ])

*/
