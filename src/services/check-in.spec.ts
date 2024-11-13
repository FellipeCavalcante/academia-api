import { expect, describe, it, beforeEach, vi, afterEach } from "vitest"
import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins-repository";
import { CheckInService } from './check-inService';
import { InMemoryGymRepository } from '@/repositories/in-memory/in-memory-gyms-repository';
import { Decimal } from '@prisma/client/runtime/library';



let checkInsRepository: InMemoryCheckInsRepository;
let gymsRepository: InMemoryGymRepository;
let sut: CheckInService;

describe("Register Service", () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRepository();
    gymsRepository = new InMemoryGymRepository();
    sut = new CheckInService(checkInsRepository, gymsRepository);

    gymsRepository.items.push({
      id: "gym-01",
      title: "Heyfit centro",
      description: '',
      phone: '',
      latitude: new Decimal(0),
      longitude: new Decimal(0),
    })

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it("should be able to check in", async () => {
    const { checkIn } = await sut.execute({
     gymId: "gym-01",
     userId: "user-01",
     userLatitude: 0,
     userLongitude: 0,
    })

    expect(checkIn.id).toEqual(expect.any(String));
  })

  it("should not be able to check in twice in the same day", async () => {
    vi.setSystemTime(new Date(2024, 0, 20, 8, 0, 0))

    await sut.execute({
     gymId: "gym-01",
     userId: "user-01",
     userLatitude: 0,
     userLongitude: 0,
    })

    await expect(() => sut.execute({
      gymId: "gym-01",
     userId: "user-01",
     userLatitude: 0,
     userLongitude: 0,
    })).rejects.toBeInstanceOf(Error);
  })

  it("should not be able to check in twice but in diffrent days", async () => {
    vi.setSystemTime(new Date(2024, 0, 20, 8, 0, 0))

    await sut.execute({
     gymId: "gym-01",
     userId: "user-01",
     userLatitude: 0,
     userLongitude: 0,
    })

    vi.setSystemTime(new Date(2024, 0, 21, 8, 0, 0))

    const { checkIn } = await sut.execute({
      gymId: "gym-01",
     userId: "user-01",
     userLatitude: 0,
     userLongitude: 0,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it("should not be able to check in on distant gym", async () => {
    gymsRepository.items.push({
      id: "gym-02",
      title: "Heyfit shopping",
      description: '',
      phone: '',
      latitude: new Decimal(-32.0346536),
      longitude: new Decimal(-52.089349),
    })

    await expect(() => sut.execute({
      gymId: "gym-02",
      userId: "user-01",
      userLatitude: -32.0378175,
      userLongitude: -52.0970702,
    })).rejects.toBeInstanceOf(Error)
  })
})