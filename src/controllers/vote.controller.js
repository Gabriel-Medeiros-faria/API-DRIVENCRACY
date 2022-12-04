import dayjs from "dayjs";
import { ObjectId } from "mongodb";
import { voteCollection } from "../database/db";
import { choiceCollection } from "../database/db";
import { pollCollection } from "../database/db";

export async function Vote(req, res){
    const {id} = req.params
    let today = dayjs()

    const choice = choiceCollection.find({_id: new ObjectId(id)})
    if(!choice){
        res.sendStatus(404)
        return
    }

    const poll = pollCollection.find({_id: new ObjectId(id)})
    if(today.isAfter(poll.expireAt)){
        res.sendStatus(403)
        return
    }
    
    try{
        await voteCollection.insertOne({expireAt: today, choiceId: new ObjectId(id)})
        res.sendStatus(201)
        return
    }catch(err){
        console.log(err)
    }
}