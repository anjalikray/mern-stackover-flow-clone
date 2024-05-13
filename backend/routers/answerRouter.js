import express from 'express'
import Answer from '../models/Answer.js'

const router = express.Router()

router.post('/' , async(req, res) => {
    const answerData = new Answer({
        question_id: req.body.question_id,
        answer: req.body.answer,
        user: req.body.user,
    })

    await answerData.save().then((doc)=> {
        res.status(201).send({
            status: true,
            data: doc
        })
    }).catch((error)=>{
        res.status(400).send({
            status: false,
            message: 'Error adding answer'
        })
    })
})



export default router;

