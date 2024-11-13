import { UsersRepository } from './../repositories/users-repository';
import { User } from '@prisma/client';
import { ResourceNotFound } from './errors/resource-not-found-error';

interface GetUserProfileServiceRequest {
  userId: string
}

interface GetUserProfileServiceResponse {
  user: User,
}

export class GetProfileService {
  constructor(
    private usersRepository: UsersRepository
  ) {}

  async execute({ 
    userId,
  }: GetUserProfileServiceRequest): Promise<GetUserProfileServiceResponse> {
    const user = await this.usersRepository.findByid(userId)

    if (!user) {
      throw new ResourceNotFound();
    }

    return {
      user,
    }
  }
}