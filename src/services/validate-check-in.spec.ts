import { expect, describe, it, beforeEach, afterEach } from "vitest"
import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins-repository";
import { ValidateCheckInService } from "./validate-check-ins";
import { ResourceNotFound } from "./errors/resource-not-found-error";


let checkInsRepository: InMemoryCheckInsRepository;
let sut: ValidateCheckInService;

describe("Validate Check in Service", () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository();
    sut = new ValidateCheckInService(checkInsRepository);


   // vi.useFakeTimers()
  })

  afterEach(() => {
    // vi.useRealTimers()
  })

  it("should be able to validate the check-in", async () => {
    const createdCheckIn = await checkInsRepository.create({
      gym_id: "gym-01",
      user_id: "user-01",
    });
  
    const { checkIn } = await sut.execute({
      checkInId: createdCheckIn.id, // Corrigido de chekcInId para checkInId
    });
  
    expect(checkIn.is_validated).toEqual(expect.any(Date));
    expect(checkInsRepository.items[0].is_validated).toEqual(expect.any(Date));
  });

  it("should not be able to validate an inexistent check-ins", async () => {
    await expect(() => sut.execute({
      checkInId: "inexistent-check-in-id",
    }),
  ).rejects.toBeInstanceOf(ResourceNotFound);
  });
})