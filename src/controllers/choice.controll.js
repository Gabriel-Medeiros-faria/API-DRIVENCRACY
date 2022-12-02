import {choiceCollection} from "../database/db.js"

export async function choice(req, res){
    const choice = res.locals.choice
    try{
        await choiceCollection.insertOne({choice})
        res.sendStatus(201)
    }catch(err){
        console.log(err)
        res.sendStatus(500)
    }
}

export async function getChoice(req, res){
    try{
        const arrChoices = await choiceCollection.find().toArray()
        res.send(arrChoices)
    }catch(err){
        console.log(err)
    }
}