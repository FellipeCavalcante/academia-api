import { Gym } from "@prisma/client";
import { GymsRepository } from "../gyms-repository";

export class InMemoryGymRepository implements GymsRepository {
  public items: Gym[] = []

  async findByid(id: string) {
    const gym = this.items.find(item => item.id === id)

    if (!gym) return null

    return gym
  }
}
