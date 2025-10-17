import { UserRepository } from '../src/repositories/user.repository';
import { UserService } from '../src/services/user.service';


describe('UserService', () => {
let repo: UserRepository;
let service: UserService;


beforeEach(() => {
repo = new UserRepository();
service = new UserService(repo);
});


test('create and get user', async () => {
const user = await service.createUser({ name: 'Alice', email: 'a@x.com' });
const fetched = await service.getUser(user.id);
expect(fetched.email).toBe('a@x.com');
});


test('update user or throw', async () => {
const user = await service.createUser({ name: 'Bob', email: 'b@x.com' });
const updated = await service.updateUser(user.id, { name: 'Bobby' });
expect(updated.name).toBe('Bobby');
});
});