"use server"

import { getServerSession } from "next-auth"
import { authOptions } from "@/app/_lib/auth"
import { db } from "@/app/_lib/prisma"

export const getConfirmedBookings = async () => {
  const session = await getServerSession(authOptions)
  if (!session?.user) {
    return []
  }
  return db.booking.findMany({
    where: {
      userId: (session.user as any).id,
      date: {
        gte: new Date(),
      },
    },
    include: {
      service: {
        include: {
          barbershop: true,
        },
      },
    },
    orderBy: {
      date: "asc",
    },
  })
}
