import dayjs from "dayjs"
import { pollCollection } from "../database/db.js"


export async function poll(req, res){
    const {expireAt} = res.locals.poll
    const poll = res.locals.poll
    const hour = dayjs("HH/MM")
    const toDay = dayjs("AAAA/MM/DD")

    if(expireAt === toDay)
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