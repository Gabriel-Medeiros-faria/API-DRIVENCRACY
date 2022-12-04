import { Router } from "express";
import { choice, getIdChoice } from "../controllers/choice.controll.js";
import {choiceValidation} from "../middlewares/choiceValidation.middlewares.js"
import { getChoice } from "../controllers/choice.controll.js";
const router = Router()

router.post("/choice", choiceValidation, choice)
router.get("/choice", getChoice)
router.get("/poll/:id/choice", getIdChoice)
export default router