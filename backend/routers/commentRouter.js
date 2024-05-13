import express from 'express'
import Comment from '../models/Comment.js'

const router = express.Router()

router.post('/:id' , async(req, res) => {

    try{
        await Comment.create({
            question_id: req.params.id,
            comment: req.body.comment,
            user: req.body.user,
        }).then((doc)=> {
            res.status(201).send({
                status: true,
                message: 'Comment added successfully'
            })
        }).catch((error)=>{
            res.status(400).send({
                status: false,
                message: 'Error adding comment'
            })
        })
    } catch(error){
        res.send(500).send({
            status: false,
            message: 'Error while adding comment'
        })
    }   
})

export default router;

