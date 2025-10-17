import { UserRepository } from '../repositories/user.repository';
import { CreateUserDTO, UpdateUserDTO, UserResponseDTO } from '../dtos/user.dto';
import { NotFoundError } from '../errors/ApiError';


export class UserService {
constructor(private repo: UserRepository) {}


async createUser(payload: CreateUserDTO): Promise<UserResponseDTO> {
// any business logic, uniqueness checks, etc.
return this.repo.create(payload);
}


async getUser(id: string): Promise<UserResponseDTO> {
const user = await this.repo.findById(id);
if (!user) throw new NotFoundError('User not found');
return user;
}


async listUsers(): Promise<UserResponseDTO[]> {
return this.repo.findAll();
}


async updateUser(id: string, payload: UpdateUserDTO): Promise<UserResponseDTO> {
const updated = await this.repo.update(id, payload);
if (!updated) throw new NotFoundError('User not found');
return updated;
}


async deleteUser(id: string): Promise<void> {
const ok = await this.repo.delete(id);
if (!ok) throw new NotFoundError('User not found');
}
}