import { CreateUserDTO, UpdateUserDTO, UserResponseDTO } from '../dtos/user.dto';
import { randomUUID } from 'crypto';


/**
* In-memory repository for demo. Replace with DB adapter in prod.
*/
export class UserRepository {
private users = new Map<string, UserResponseDTO>();


async create(payload: CreateUserDTO): Promise<UserResponseDTO> {
const id = randomUUID();
const user: UserResponseDTO = { id, name: payload.name, email: payload.email, age: payload.age ?? null };
this.users.set(id, user);
return user;
}


async findById(id: string): Promise<UserResponseDTO | null> {
return this.users.get(id) ?? null;
}


async findAll(): Promise<UserResponseDTO[]> {
return Array.from(this.users.values());
}


async update(id: string, payload: UpdateUserDTO): Promise<UserResponseDTO | null> {
const existing = this.users.get(id);
if (!existing) return null;
const updated = { ...existing, ...payload, age: payload.age ?? existing.age };
this.users.set(id, updated);
return updated;
}


async delete(id: string): Promise<boolean> {
return this.users.delete(id);
}
}