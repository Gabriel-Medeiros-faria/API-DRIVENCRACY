import { Router } from "express";
import { Vote } from "../controllers/vote.controller.js";
import { getVotes } from "../controllers/vote.controller.js";
const router = Router()

router.post("/choice/:id/vote", Vote)
router.get("/votes", getVotes)
export default router