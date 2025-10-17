# Typed Error Classes

```typescript
const validateBody = (schema: ZodSchema) => (req, _res, next) => {
const result = schema.safeParse(req.body);
if (!result.success) return next(new BadRequestError('Invalid body'));
req.body = result.data;
next();
};
```
Custom subclasses:

```
class NotFoundError extends ApiError {
constructor(resource = 'Resource') {
super(`${resource} not found`, 404);
}
}
```
Centralized middleware:

```typescript
export function errorHandler(err, req, res, _next) {
res.status(err.status || 500).json({ message: err.message });
}
```
