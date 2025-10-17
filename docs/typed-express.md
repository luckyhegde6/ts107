# Strongly Typed Route Handlers in Express

Express allows generics for RequestHandler:
```
import { RequestHandler } from 'express';
RequestHandler<Params, ResBody, ReqBody>
```

Example:
```
const createUser: RequestHandler<{}, UserResponse, CreateUser> = async (req, res) => {
const user = await service.createUser(req.body);
res.status(201).json(user);
};
```
TypeScript ensures that the req.body must conform to CreateUser and res.json() to UserResponse.

