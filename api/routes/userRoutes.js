import  express  from "express";
import { test } from "../models/controllers/userController.js";

const router =express.Router();
router.get('/test',test)
   

export default router;