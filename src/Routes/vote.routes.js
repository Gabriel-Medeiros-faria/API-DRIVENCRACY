import { Router } from "express";
import { Vote } from "../controllers/vote.controller";
const router = Router()


router.post("/choice/:id/vote", Vote)
