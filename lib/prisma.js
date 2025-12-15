import { PrismaClient } from "@prisma/client"
import { PrismaPg } from "@prisma/adapter-pg"

const globalForPrisma = global

const rawDatabaseUrl = process.env.DATABASE_URL || process.env.NEXT_PUBLIC_DATABASE_URL || ''
const databaseUrl = rawDatabaseUrl.replace(/^"|"$/g, '')

const adapter = new PrismaPg({ connectionString: databaseUrl })

let prisma = globalForPrisma.prisma || new PrismaClient({ adapter })

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma
}

export default prisma