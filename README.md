# Typed REST API



[![CI](https://github.com/luckyhegde6/ts107/actions/workflows/ci.yml/badge.svg)](https://github.com/luckyhegde6/ts107/actions/workflows/ci.yml)

[![Build Status](https://img.shields.io/github/actions/workflow/status/luckyhegde6/ts107/ci.yml?branch=main)](https://github.com/luckyhegde6/ts107/actions/workflows/ci.yml)

[![License](https://img.shields.io/badge/license-MIT-green)](./LICENSE)

## 📖 Overview
A fully type-safe backend built using TypeScript + Node.js + Express. This mini project demonstrates production-grade architecture patterns — strongly typed route handlers, DTO validation using zod, layered structure, and CI-ready testing setup.

## 🚀 Features

Strict TypeScript everywhere (no implicit any!)

Typed request and response objects using generics.

DTO-based validation with zod.

Centralized error handling middleware.

Clean architecture (controller → service → repository).

Logging middleware with morgan.

Unit & integration tests (Jest + Supertest).

GitHub Actions CI pipeline.

# 🧱 Tech Stack

Node.js + Express.js for backend.

TypeScript for compile-time type safety.

Zod for runtime schema validation.

Jest + Supertest for testing.

ESLint + Prettier for linting & formatting.

GitHub Actions for CI/CD.

## 🗂️ Project Structure
```
src/
├─ app.ts # Express app setup
├─ server.ts # Entry point
├─ routes/ # Express route definitions
├─ controllers/ # Route handlers
├─ services/ # Business logic layer
├─ repositories/ # Data access abstraction
├─ dtos/ # DTOs & validation schemas
├─ middlewares/ # Error, logging, validation
├─ utils/ # Logger, helpers
├─ errors/ # ApiError definitions
├─ config/ # Environment config
└─ types/ # Express typings
tests/
├─ unit/ # Unit tests
├─ integration/ # Integration tests 
.gitignore
package.json
tsconfig.json
jest.config.js

README.md
```

## 🧩 Setup

### 1️⃣ Clone and Install
```bash
git clone https://github.com/<your-username>/typed-rest-api.git
cd typed-rest-api
npm install
```

### 2️⃣ Environment Variables
Create a `.env` file in the root directory and add the following variables:
```PORT=3000
NODE_ENV=development
```
### 3️⃣ Run the Server
```bash
npm run build
npm start
# Or for development with hot-reloading
npm run dev

# The server will start on http://localhost:3000
```

## 🧪 Testing
```bash
npm test
```

## 🌐 Example API Usage
### Create User
```http
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{"name":"Alice","email":"alice@example.com"}'

```
### Get All Users
```http
curl -X GET http://localhost:3000/api/users
```   
### Get User by ID
```http  
curl -X GET http://localhost:3000/api/users/{id}
```
### Update User
```http
curl -X PUT http://localhost:3000/api/users/{id} \
  -H "Content-Type: application/json" \
  -d '{"name":"Alice Updated","email":"alice.updated@example.com"}'  
```
### Delete User
```http
curl -X DELETE http://localhost:3000/api/users/{id}
```   
## 🧱 Type Safety in Action
All route handlers use generics for precise typing:
```typescript
const createUser: RequestHandler<{}, UserResponseDTO, CreateUserDTO> = async (req, res) => {
  const user = await service.createUser(req.body);
  res.status(201).json(user);
};

```
Compile-time guarantees prevent mismatched request/response shapes.

---

## ⚙️ Validation with Zod

```typescript
const CreateUserSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  age: z.number().optional(),
});
type CreateUserDTO = z.infer<typeof CreateUserSchema>;
```
Middleware automatically validates and rejects invalid requests before reaching controllers.

---

## 🧠 Learning & Documentation

Check the /docs folder for:

- [ARCHITECTURE.md](docs/ARCHITECTURE.md) — HLD & LLD diagrams
- [LEARNING.md](docs/LEARNING.md) — TypeScript + Express concepts
- [typed-express.md](docs/typed-express.md) — Typed handlers and DTOs
- [dtos.md](docs/dtos.md) — DTO validation patterns
- [error-handling.md](docs/error-handling.md) — Centralized error patterns
- [INTERVIEW_QUESTIONS.md](docs/INTERVIEW_QUESTIONS.md) — Senior-level interview prep
- [NEETCODE.md](docs/NEETCODE.md) — Sequence diagram, edge cases, complexity, patterns
- [DESIGN_PATTERNS.md](docs/DESIGN_PATTERNS.md) — Clean architecture & design patterns