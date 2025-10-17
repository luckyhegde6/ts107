# Express + TypeScript Interview Questions (Detailed)

This file contains curated technical and conceptual questions (with guidance on how to answer them) for mid-to-senior backend developers building Node.js APIs in TypeScript.

---

### 1. **How does TypeScript improve backend API development?**

**Key points:**

* Enforces static typing, catching potential bugs before runtime.
* Enhances IDE autocompletion and refactoring safety.
* Defines strict contracts between layers (controller → service → repository).
* Reduces runtime validation effort when combined with runtime type validators (e.g., `zod`).
* Makes large-scale projects maintainable through predictable types.

**Sample follow-up:** Discuss trade-offs — extra compile time vs reliability.

---

### 2. **Explain how Express’s generic `RequestHandler` type works.**

**Core concept:**
Express exposes the following signature for `RequestHandler`:

```ts
RequestHandler<Params, ResBody, ReqBody, ReqQuery>
```

You can explicitly type route parameters, request body, and response body.

**Example:**

```ts
const createUser: RequestHandler<{}, UserResponseDTO, CreateUserDTO> = async (req, res) => {
  const user = await service.createUser(req.body);
  res.status(201).json(user);
};
```

This ensures compile-time guarantees that `req.body` matches `CreateUserDTO` and the response matches `UserResponseDTO`.

---

### 3. **What are DTOs and why are they important?**

**Answer:**
Data Transfer Objects (DTOs) define the shape of data exchanged between layers or systems. In TypeScript:

* They provide compile-time contracts.
* When paired with validation libraries, they ensure runtime safety.
* They decouple external API models from internal persistence models.

**Example:**

```ts
export interface CreateUserDTO { name: string; email: string; }
```

---

### 4. **How do runtime validators like zod complement TypeScript?**

**Answer:**
TypeScript ensures correctness *at compile time* but doesn’t protect against malformed runtime inputs (e.g., API calls).

`zod` adds runtime validation:

```ts
const schema = z.object({ email: z.string().email() });
const parsed = schema.safeParse(req.body);
```

You can infer TypeScript types from the same schema using `z.infer<typeof schema>` — ensuring single-source truth.

---

### 5. **Describe the Clean Architecture approach used in this project.**

**Answer:**
The app separates concerns into distinct layers:

* **Controller:** Receives requests, invokes services.
* **Service:** Encapsulates business rules.
* **Repository:** Manages data persistence.
* **Middlewares:** Handle cross-cutting concerns like validation and logging.

This improves testability, maintainability, and separation of concerns.

---

### 6. **How does dependency injection improve modularity in Node.js apps?**

**Answer:**
DI decouples components — for instance, the `UserService` doesn’t create its own repository; it receives one.
This allows mocking dependencies for tests and swapping implementations easily (e.g., in-memory vs database repository).

**Example:**

```ts
const repo = new UserRepository();
const service = new UserService(repo);
```

Libraries like `tsyringe` or `TypeDI` automate dependency management.

---

### 7. **How do you design robust error handling in TypeScript backends?**

**Answer:**
Use a base `ApiError` class and typed middleware to centralize error handling:

```ts
class ApiError extends Error { constructor(public status: number, msg: string) { super(msg); } }
```

**Flow:**

1. Throw typed errors from services.
2. Catch them in `errorHandler` middleware.
3. Send consistent JSON responses.

This approach allows distinguishing between operational errors and programmer bugs.

---

### 8. **What’s the advantage of using `async/await` with strong typing?**

**Answer:**

* Cleaner, linear control flow.
* TypeScript ensures all `await` calls return the expected type.
* Prevents unhandled promise errors at compile time.

Example:

```ts
async getUser(id: string): Promise<UserResponseDTO> {
  const user = await this.repo.findById(id);
  if (!user) throw new NotFoundError();
  return user;
}
```

---

### 9. **How do you test an Express API in a type-safe way?**

**Answer:**
Use **Jest + Supertest** for integration testing.
Mock dependencies for unit tests.

Example:

```ts
const app = createApp();
await request(app).post('/api/users').send({ name: 'John', email: 'john@x.com' });
```

Types ensure that mocks and spies return correct structures.

---

### 10. **How do you ensure consistency between validation and TypeScript types?**

**Answer:**
Use libraries like `zod` to define schemas once and infer types:

```ts
const schema = z.object({ id: z.string() });
type UserDTO = z.infer<typeof schema>;
```

Thus, runtime and compile-time definitions always stay in sync.

---

### 11. **How would you extend this architecture to support authentication?**

**Answer:**

* Add middleware for JWT or OAuth validation.
* Use a typed `req.user` interface extension (`Express.Request`).
* Encapsulate auth logic in a dedicated `AuthService`.

---

### 12. **What are some scalability concerns for this project design?**

**Answer:**

* In-memory repository isn’t scalable → migrate to database (Postgres, Redis).
* Add caching at repository level.
* Introduce async message queues for heavy workloads.
* Use load balancers and stateless design.

---

### 13. **What’s the role of CI/CD here and how would you enhance it?**

**Answer:**
Current CI runs build + lint + test on PR.
Enhancements:

* Add code coverage reporting.
* Run tests in matrix (Node 18, 20).
* Add security scans (`npm audit`, `snyk`).

---

### 14. **How does TypeScript help in refactoring API contracts safely?**

**Answer:**
TypeScript’s compiler ensures every change in DTOs propagates compile-time errors through affected layers, guaranteeing consistency.

---

### 15. **What design patterns are demonstrated in this codebase?**

* **Repository pattern:** abstracts data access.
* **Service layer:** encapsulates business rules.
* **Factory pattern:** `makeUserController()` returns controller functions.
* **Dependency injection (manual):** passing repo into service.

---

### 16. **How can you use generics to create reusable APIs or repositories?**

**Example:**

```ts
class Repository<T> {
  private items: Map<string, T> = new Map();
  create(item: T) {...}
  findById(id: string): T | undefined {...}
}
```

This allows reuse for any model type (User, Product, etc.).

---

### 17. **What’s the difference between compile-time and runtime validation?**

* **Compile-time (TypeScript):** prevents developer mistakes.
* **Runtime (zod/class-validator):** protects against bad user input.
  A robust system needs both.

---

### 18. **What metrics or logging improvements would you add for production?**

* Structured JSON logs.
* Correlation IDs per request.
* Winston or Pino integration.
* Request timing metrics via middleware.

---

### 19. **How would you handle versioning for this API?**

* Add version prefix: `/api/v1/users`.
* Maintain multiple router instances per version.
* Deprecate gradually using middleware warnings.

---

### 20. **How do you ensure maintainability as the codebase grows?**

* Strict linting, Prettier, and commit hooks.
* Comprehensive tests.
* Separation of modules.
* Continuous refactoring guided by TypeScript’s compiler feedback.

---
