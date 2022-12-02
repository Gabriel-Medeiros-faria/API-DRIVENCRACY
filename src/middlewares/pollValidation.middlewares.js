import { pollSchema } from "../models/poll.model.js"

export function pollValidation(req, res, next){
    const poll = req.body

    const {error} = pollSchema.validate(poll, {abortEarly:false})

    if(error){
        const errors = error.details.map((detail) => detail.message)
        return res.status(400).send(errors)
    }

    res.locals.poll = poll

    next()
}