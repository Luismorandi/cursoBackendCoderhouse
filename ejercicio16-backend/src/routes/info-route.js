import { Router } from "express";
import {
 infoGet
} from "../controllers/infoController.js";

const info = Router();

info.get("/", infoGet);

export default info;
