import { CheckIn } from '@prisma/client';
import { CheckInsRepository } from '@/repositories/check-ins-repository';

interface FecthUserRequest {
  userId: string,
  page: number
}

interface FecthUserCheckInsHistoryResponse {
  checkIns: CheckIn[]
}

export class FecthUserCheckInsHistory {
  constructor(
    private checkInsRepository: CheckInsRepository,
    ) {}

  async execute({ 
    userId,
    page
  }: FecthUserRequest): Promise<FecthUserCheckInsHistoryResponse> {

    const checkIns = await this.checkInsRepository.findManyByUserId(userId, page)

    return {
      checkIns,
    }
  }
}