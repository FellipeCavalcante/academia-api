import { Gym } from "@prisma/client";

export interface GymsRepository {
  findByid(id: string): Promise<Gym | null>;
}