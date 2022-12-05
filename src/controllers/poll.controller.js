import dayjs from "dayjs"
import { ObjectId } from "mongodb";
import { choiceCollection, pollCollection, voteCollection } from "../database/db.js"
import { choice } from "./choice.controll.js";


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

export async function getLargerVote(req, res) {
    const { id } = req.params;
    const today = dayjs()
    try {
        const poll =  await pollCollection.findOne({_id: ObjectId(id)})
        const choice = await choiceCollection.findOne({_id: ObjectId(maisVotado.id.toString())})

        if(today.isAfter(poll.expireAt) || !poll){
            res.sendStatus(404)
            return
        }
        const choices = await choiceCollection.find({ pollId: id }).toArray();

        const choicesMap = choices.map((obj) => { return new ObjectId(obj._id) });
        const votes = await voteCollection.find({ choiceId: { $in: [...choicesMap] } }).toArray();

        let choicesId = choices.map((choice) => {
            const count = votes.filter((obj) =>  obj.choiceId.toString() === choice._id.toString()).length;
            return ({ id: choice._id, count });
        })

        const maisVotado = choicesId.sort((a, b) => b.count - a.count).at(0);


        const obj = {
            _id: id,
            title: poll.title,
            expireAt: poll.expireAt,
            result:{
                title: choice.title,
                votes: maisVotado.count
            }
        }
        res.send(obj)
    }
    catch (err) {
        console.log(err);
    }
}