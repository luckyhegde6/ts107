# Design Patterns — ts107: Typed REST API

## Patterns Used

### 1. Clean Architecture (Layered)

```
Routes → Controller → Service → Repository
```

Strict layer separation: inner layers know nothing about outer layers.

### 2. Dependency Injection

```typescript
// routes/user.routes.ts
const repo = new UserRepository();
const service = new UserService(repo);
const controller = makeUserController(service);
```

Manual DI — no framework needed for this scale. Easy to swap with tsyringe/NestJS later.

### 3. Factory Pattern

```typescript
export function makeUserController(service: UserService) {
  return {
    create: async (req, res, next) => { ... },
    getOne: async (req, res, next) => { ... },
    list: async (req, res, next) => { ... },
    update: async (req, res, next) => { ... },
    remove: async (req, res, next) => { ... },
  };
}
```

Encapsulates controller construction and dependency wiring.

### 4. Middleware Chain Pattern

```typescript
app.use(express.json());
app.use(requestLogger);
app.use('/api/users', userRoutes);
app.use(errorHandler);
```

Each middleware either handles the request or passes to `next()`.

### 5. DTO Pattern

```typescript
// Zod schema = single source of truth for validation + type
const CreateUserSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  age: z.number().int().positive().optional(),
});
type CreateUserDTO = z.infer<typeof CreateUserSchema>;
```

### 6. Error Hierarchy + Centralized Handler

```typescript
class ApiError extends Error { constructor(public status: number, message: string) {} }
class NotFoundError extends ApiError { constructor(msg) { super(404, msg); } }
class BadRequestError extends ApiError { constructor(msg) { super(400, msg); } }

// Global error handler middleware catches ALL errors
app.use((err, req, res, next) => {
  if (err instanceof ApiError) { ... }
  else { res.status(500).json({ message: 'Internal server error' }); }
});
```

### 7. Repository Pattern

```typescript
class UserRepository {
  private store = new Map<string, UserResponseDTO>();
  async create(data: CreateUserDTO): Promise<UserResponseDTO> { ... }
  async findById(id: string): Promise<UserResponseDTO | undefined> { ... }
  async findAll(): Promise<UserResponseDTO[]> { ... }
  async update(id: string, data: UpdateUserDTO): Promise<UserResponseDTO> { ... }
  async delete(id: string): Promise<boolean> { ... }
}
```

## Evolution Path

- In-memory Repo → Prisma/TypeORM (production)
- Manual DI → NestJS / tsyringe
- Static Zod schemas → OpenAPI generation
- Current patterns directly applicable to production microservices
