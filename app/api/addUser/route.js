import prisma from "../../../lib/prisma"

export async function POST() {
  try {
    const newUser = await prisma.user.create({
      data: {
        name: "John Doe",
        email: "john@example.com",
        password: "123456",
      },
    })
    return new Response(JSON.stringify(newUser), { status: 201 })
  } catch (error) {
    console.error(error)
    return new Response("Error adding user", { status: 500 })
  }
}