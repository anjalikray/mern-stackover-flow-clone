import express from 'express'
import questionRouter from './questionRouter.js'
import answerRouter from './answerRouter.js'
import commentRouter from './commentRouter.js'

const router = express.Router()

router.get('/' , (req , res) => {
    res.send('Welcome to StackOverFlow')
}) 

router.use('/question' , questionRouter)
router.use('/answer' , answerRouter)
router.use('/comment' , commentRouter)



export default router;