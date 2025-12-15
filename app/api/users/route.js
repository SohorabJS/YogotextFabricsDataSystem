import prisma from "../../../lib/prisma"

export async function GET() {
  try {
    const users = await prisma.user.findMany()
    return new Response(JSON.stringify(users), { status: 200 })
  } catch (error) {
    console.error(error)
    return new Response("Error fetching users", { status: 500 })
  }
}