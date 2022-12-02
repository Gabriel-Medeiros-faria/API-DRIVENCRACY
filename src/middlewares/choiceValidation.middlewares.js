import { choiceSchema } from "../models/choice.model.js"

export function choiceValidation(req, res, next){
    const choice = req.body

    const {error} = choiceSchema.validate(choice, {abortEarly:false})

    if(error){
        const errors = error.details.map((detail) => detail.message)
        return res.status(400).send(errors)
    }

    res.locals.choice = choice

    next()
}