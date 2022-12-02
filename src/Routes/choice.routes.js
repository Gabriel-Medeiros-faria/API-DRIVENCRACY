import { Router } from "express";
import { choice } from "../controllers/choice.controll.js";
import {choiceValidation} from "../middlewares/choiceValidation.middlewares.js"
import { getChoice } from "../controllers/choice.controll.js";
const router = Router()

router.post("/choice", choiceValidation, choice)
router.get("/choice", getChoice)

export default router