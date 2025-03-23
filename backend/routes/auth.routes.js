import express from 'express';
import { signin, signup, signout } from '../controllers/auth.controller.js';
import { getcookie } from '../controllers/auth.controller.js';

const router = express.Router();

router.post('/signup', signup);

router.post('/signin',signin);

router.post('/signout',signout);

router.get('/cookie',getcookie);

export default router;