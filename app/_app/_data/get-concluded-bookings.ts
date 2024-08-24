"use server"

import { authOptions } from "@/app/_lib/auth"
import { db } from "@/app/_lib/prisma"
import { getServerSession } from "next-auth"

export const getConcludedBookings = async () => {
  const session = await getServerSession(authOptions)
  if (!session?.user) return []
  return db.booking.findMany({
    where: {
      userId: (session.user as any).id,
      date: {
        lt: new Date(),
      },
    },
    include: {
      service: {
        include: {
          barbershop: true,
        },
      },
    },
  })
}
