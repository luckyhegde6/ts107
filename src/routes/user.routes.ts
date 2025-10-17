// User routes
import { Router } from 'express';
import { UserRepository } from '../repositories/user.repository';
import { UserService } from '../services/user.service';
import { makeUserController } from '../controllers/user.controller';
import { validateBody } from '../middlewares/validation';
import { CreateUserSchema, UpdateUserSchema } from '../dtos/user.dto';


const router = Router();


const repo = new UserRepository();
const service = new UserService(repo);
const ctrl = makeUserController(service);


router.post('/', validateBody(CreateUserSchema), ctrl.create);
router.get('/', ctrl.list);
router.get('/:id', ctrl.getOne);
router.put('/:id', validateBody(UpdateUserSchema), ctrl.update);
router.delete('/:id', ctrl.remove);


export default router;