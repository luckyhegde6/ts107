# Data Transfer Objects (DTOs)

DTOs enforce consistency between layers.

Using zod:

```typescript
const CreateUser = z.object({ name: z.string(), email: z.string().email() });
type CreateUserDTO = z.infer<typeof CreateUser>;
```
Validation middleware:
```typescript
const validateBody = (schema: ZodSchema) => (req, _res, next) => {
const result = schema.safeParse(req.body);
if (!result.success) return next(new BadRequestError('Invalid body'));
req.body = result.data;
next();
};
``` 

