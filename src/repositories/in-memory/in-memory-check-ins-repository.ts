import { Prisma, CheckIn } from "@prisma/client";
import { CheckInsRepository } from "../check-ins-repository";
import { randomUUID } from "crypto";
import dayjs from "dayjs";

export class InMemoryCheckInsRepository implements CheckInsRepository {
  public items: CheckIn[] = []

  async findByUserIdOnDate(userId: string, data: Date) {
    const startOfTheDay = dayjs(data).startOf('date')
    const endOfTheDay = dayjs(data).endOf('date')

    const checkOnSameDate = this.items.find((CheckIn) => {
      const checkInDate = dayjs(CheckIn.created_at)
      const isOnSameDate = checkInDate.isAfter(startOfTheDay) && checkInDate.isBefore(endOfTheDay)

      return CheckIn.user_id === userId && isOnSameDate
    })

    if (!checkOnSameDate) return null

    return checkOnSameDate
  }

  async findManyByUserId(userId: string, page: number) {
    return this.items
      .filter((item) => item.user_id === userId)
      .slice((page - 1) * 20, page * 20)
  }

  async create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn> {
    const checkIn = {
      id: randomUUID(),
      user_id: data.user_id,
      gym_id: data.gym_id,
      is_validated: data.is_validated ? new Date(data.is_validated) : null,
      created_at: new Date(),
    }

    this.items.push(checkIn)

    return checkIn
  }
}
