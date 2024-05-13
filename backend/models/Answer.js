import mongoose from 'mongoose'

const answerSchema = new mongoose.Schema({
    question_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Questions"
    },
    answer: String,
    created_at: {
        type: Date,
        default: Date.now()
    },
    user: Object,
    comment_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comments"
    }

})

const Answer = mongoose.model('answer' , answerSchema);

export default Answer;