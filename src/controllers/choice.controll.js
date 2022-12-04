import {choiceCollection, pollCollection} from "../database/db.js"
import { ObjectId } from "mongodb";
import dayjs from "dayjs";


export async function choice(req, res){
    const {pollId} = res.locals.choice
    const choice = res.locals.choice

    let poll = await pollCollection.findOne({_id: new ObjectId(pollId)})

    let today ;
    today = dayjs()

    if(today.isAfter(poll.expireAt)){
        res.sendStatus(403)
        return
    }
    try{
        await choiceCollection.insertOne(choice)
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

export async function getIdChoice(req, res){
    const {id} = req.params

    try{
        const idChoice = await choiceCollection.find({pollId: id}).toArray()
        res.send(idChoice)
    }catch(err){
        console.log(err)
    }
}