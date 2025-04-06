import e from "express";
import { handleUserLogin } from "../controllers/login.js";
const routerLogin = e.Router();

routerLogin.post('/login', handleUserLogin)

export default routerLogin;