import { RequestHandler } from 'express';
import { UserService } from '../services/user.service';
import { CreateUserDTO, UpdateUserDTO } from '../dtos/user.dto';


export function makeUserController(service: UserService) {
const create: RequestHandler<Record<string, string>, any, CreateUserDTO> = async (req, res, next) => {
try {
const user = await service.createUser(req.body);
res.status(201).json(user);
} catch (err) {
next(err);
}
};


const getOne: RequestHandler<{ id: string }, any> = async (req, res, next) => {
try {
const user = await service.getUser(req.params.id);
res.json(user);
} catch (err) {
next(err);
}
};


const list: RequestHandler<Record<string, string>, any> = async (req, res, next) => {
try {
const users = await service.listUsers();
res.json(users);
} catch (err) {
next(err);
}
};


const update: RequestHandler<{ id: string }, any, UpdateUserDTO> = async (req, res, next) => {
try {
const updated = await service.updateUser(req.params.id, req.body);
res.json(updated);
} catch (err) {
next(err);
}
};


const remove: RequestHandler<{ id: string }, any> = async (req, res, next) => {
try {
await service.deleteUser(req.params.id);
res.status(204).end();
} catch (err) {
next(err);
}
};


return { create, getOne, list, update, remove };
}