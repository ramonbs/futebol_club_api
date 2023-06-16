import { Router } from 'express';
import TokenValidator from '../middlewares/TokenValidation';
import TokenGeneratorJwt from '../services/TokenGenerator';
import EncrypterBcryptService from '../services/EncrypterBcryptService';
import UserModel from '../models/UserModel';
import UserService from '../services/UserService';
import UserController from '../controllers/UserController';
import Validation from '../middlewares/Login/LoginValidation';

const userModel = new UserModel();
const encrypter = new EncrypterBcryptService();
const token = new TokenGeneratorJwt();
const userService = new UserService(userModel, encrypter, token);
const userController = new UserController(userService);

const router = Router();

router.post('/', Validation.validateLogin, (req, res) => {
  userController.getUserLogin(req, res);
});

router.get('/role', TokenValidator.validateToken, (req, res) => {
  userController.getUserRole(req, res);
});

export default router;
