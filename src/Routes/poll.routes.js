import { Router } from "express";
import { poll } from "../controllers/poll.controller.js";
import {pollValidation} from "../middlewares/pollValidation.middlewares.js"
import { getPoll, getLargerVote } from "../controllers/poll.controller.js";
const router = Router()

router.post("/poll", pollValidation, poll)
router.get("/poll", getPoll)
router.get("/poll/:id/result", getLargerVote)
export default router