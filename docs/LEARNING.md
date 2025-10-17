# Learning Notes — TypeScript + Express

## 1. Why TypeScript for Node.js?

TypeScript adds compile-time safety, reducing runtime errors. With Express, it helps ensure routes, handlers, and services share consistent types.

## 2. Typing Express Handlers
```
import { RequestHandler } from 'express';
const getUser: RequestHandler<{ id: string }> = (req, res) => {
res.json({ id: req.params.id });
};
```
The first generic argument types the `req.params` object into is `{ id: string }`. This ensures that the route handler expects a JSON object with an `id` property of type `string`, the second generic argument types the `res.body` object into `{ id: string }`, and the third generic argument types the `req.body` object into `{ name: string }`.

## 3. DTOs with zod
Using zod, we can define schemas for request validation:
```
const UserSchema = z.object({ name: z.string(), email: z.string().email() });
type UserDTO = z.infer<typeof UserSchema>;
```
Zod gives both runtime validation and static TypeScript types.

## 4. Error Handling Flow

Errors are caught and passed to centralized middleware. Strong typing ensures known shapes for operational errors.

## 5. Layers in Clean Architecture

- Controller: orchestrates input/output.
- Service: business logic.
- Repository: data access.
