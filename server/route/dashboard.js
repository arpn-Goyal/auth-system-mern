import e from "express";
import { verifyToken } from "../middleware/verifyToken.js";
const dashboardRoutes = e.Router();

dashboardRoutes.get('/', verifyToken,(req, res)=>{
    res.json({message: `Welcome ${req.user.email} to your dashboard!`})
})

export default dashboardRoutes;