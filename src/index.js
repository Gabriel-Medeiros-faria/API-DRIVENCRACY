import express  from "express";
import cors from "cors";
import dotenv from "dotenv"
dotenv.config();
import choiceRoutes from "./Routes/choice.routes.js"
import pollRoutes from "./Routes/poll.routes.js"

const app = express()

app.use(express.json());
app.use(cors());
app.use(choiceRoutes)
app.use(pollRoutes)

const port = "mongodb+srv://GabrielMedeiros:12345@drivencracy.lf1vo3n.mongodb.net/?retryWrites=true&w=majority"
app.listen(port, ()=> console.log(`Server runing in port: ${port}`))