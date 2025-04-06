import e from "express";
import { handleRegisterUser } from "../controllers/register.js";
const routerRegister = e.Router();

routerRegister.post('/register', handleRegisterUser);

export default routerRegister;
