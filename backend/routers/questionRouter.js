import express from "express";
import Question from "../models/Question.js";
import Answer from "../models/Answer.js";
import Comment from "../models/Comment.js";

const router = express.Router();

router.post("/", async (req, res) => {
    const questionData = new Question({
        title: req.body.title,
        body: req.body.body,
        tags: req.body.tag,
        user: req.body.user,
    });

    await questionData
        .save()
        .then((doc) => {
            res.status(201).send({
                status: true,
                data: doc,
            });
        })
        .catch((error) => {
            res.status(400).send({
                status: false,
                message: "Error adding question",
            });
        });
});

router.get("/", async (req, res) => {
    try {
        const questions = await Question.find({}).lean();
        for (let question of questions) {
            question.answers = await Answer.find({
                question_id: question._id,
            }).lean();
        }
        for (let question of questions) {
            question.comments = await Comment.find({
                question_id: question._id,
            }).lean();
        }

        res.status(200).send(questions);
    } catch (e) {
        res.status(400).send({
            message: "Error in getting question",
            error: e.message,
        });
    }
});

router.get("/:id", async (req, res) => {
    try {
        const questionId = req.params.id;

        const question = await Question.findById(questionId).lean();
        if (!question) {
            return res.status(404).send({ message: "Question not found" });
        }

        question.answers = await Answer.find({ question_id: questionId }).lean();
        question.comments = await Comment.find({ question_id: questionId }).lean();

        res.status(200).send(question);
    } catch (e) {
        res.status(400).send({
            message: "Error in getting question",
            error: e.message,
        });
    }
});


export default router;
