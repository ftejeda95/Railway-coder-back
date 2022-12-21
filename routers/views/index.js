import { Router } from 'express';
import productoTest from '../views-test/index.js';
import login from './login.js';
import registro from './registro.js';


const router = Router();
router.use('/', productoTest, login, registro);

export default router;