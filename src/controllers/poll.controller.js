import dayjs from "dayjs"
import { pollCollection } from "../database/db.js"


export async function poll(req, res){
    const poll = res.locals.poll
    let today ;

    if(!poll.expireAt){
        today = dayjs().add(30 , "day").format("YYYY-MM-DD HH:mm")
        poll.expireAt = today
    }
    try{
        await pollCollection.insertOne(poll)
        res.sendStatus(201)
    }catch(err){
        console.log(err)
        res.sendStatus(500)
    }
}

export async function getPoll(req, res){
    try{
        const arrPoll = await pollCollection.find().toArray()
        res.send(arrPoll)
    }catch(err){
        console.log(err)
    }
}