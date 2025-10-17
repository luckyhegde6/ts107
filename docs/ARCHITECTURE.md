# High-Level Design (HLD)

**Goal**: Provide a modular, testable REST API using strict typing.

**Layers**:

- ***Routes**: Define endpoints.
- ***Controllers**: Receive HTTP input and delegate.
- ***Services**: Contain core logic.
- ***Repositories**: Manage data access.
- ***Middlewares**: Handle cross-cutting concerns.

Flow:
```mermaid
Request → Validation → Controller → Service → Repository → Response
```
---

# Low-Level Design (LLD)

DTOs: Defined with zod, providing both runtime validation and inferred TypeScript types.

User Example:
```typescript
POST /api/users
Body: CreateUserDTO
Response: UserResponseDTO
```

Function Signatures:
```
createUser(payload: CreateUserDTO): Promise<UserResponseDTO>
```