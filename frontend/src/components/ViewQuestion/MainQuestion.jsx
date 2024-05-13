import { Link } from "react-router-dom";
import BookmarkIcon from "@mui/icons-material/Bookmarks";
import HistoryIcon from "@mui/icons-material/History";
import { Avatar } from "@mui/material";
import axios from "axios";
import "../StackOverFlow/css/allQuestion.css";
import "./css/index.css";

import parse from "html-react-parser";

import { useEffect, useState } from "react";

import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";

const MainQuestion = () => {
    const [show, setShow] = useState(false);
    const [questionDetails, setQuestionDetails] = useState();
    const [answer, setAnswer] = useState("");
    const [comment, setComment] = useState("");

    const user = useSelector(selectUser);

    let search = window.location.search;
    const params = new URLSearchParams(search);
    const id = params.get("id");

    const handleQuill = (value) => {
        setAnswer(value);
    };

    const handleSubmit = async () => {
        if (answer !== "") {
            const body = {
                question_id: id,
                answer: answer,
                user: user,
            };
            const config = {
                headers: {
                    "Content-Type": "application/json",
                },
            };
            await axios
                .post("/api/answer", body, config)
                .then((res) => {
                    // console.log(res.data);
                    alert("Answer added successfully");
                    setAnswer("");
                    getUpdateAnswer();
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    };

    const handleComment = async () => {
        if (comment !== "") {
            const body = {
                question_id: id,
                comment: comment,
                user: user,
            };

            await axios
                .post(`/api/comment/${id}`, body)
                .then((res) => {
                    // console.log(res.data);
                    setComment("");
                    setShow(false);
                    getUpdateAnswer();
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    };

    async function getUpdateAnswer() {
        await axios
            .get(`/api/question/${id}`)
            .then((res) => {
                // console.log(res.data);
                setQuestionDetails(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    useEffect(() => {
        async function getQuestionDetails() {
            await axios
                .get(`/api/question/${id}`)
                .then((res) => {
                    // console.log(res.data);
                    setQuestionDetails(res.data);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
        getQuestionDetails();
    }, [id]);

    return (
        <div className="main">
            <div className="main-container">
                <div className="main-top">
                    <h2 className="main-question">{questionDetails?.title}</h2>
                    <Link to="/add-question">
                        <button>Ask Question</button>
                    </Link>
                </div>

                <div className="main-desc">
                    <div className="info">
                        <p>
                            {new Date(
                                questionDetails?.created_at
                            ).toLocaleString()}
                        </p>
                        <p>
                            Active<span>Today</span>
                        </p>
                        <p>
                            Viewed<span>43 times</span>
                        </p>
                    </div>
                </div>

                <div className="all-questions">
                    <div className="all-questions-container">
                        <div className="all-questions-left">
                            <div className="all-options">
                                <p className="arrow">▲</p>
                                <p className="arrow">0</p>
                                <p className="arrow">▼</p>
                                <BookmarkIcon />
                                <HistoryIcon />
                            </div>
                        </div>

                        <div className="question-answer">
                            <p>{parse(questionDetails?.body || "")}</p>
                            <div className="author">
                                <small>
                                    asked{" "}
                                    {new Date(
                                        questionDetails?.created_at
                                    ).toLocaleString()}{" "}
                                </small>
                                <div className="author-details">
                                    <Avatar
                                        src={questionDetails?.user?.photo}
                                    />
                                    <p>
                                        {questionDetails?.user?.displayName
                                            ? questionDetails?.user?.displayName
                                            : String(
                                                  questionDetails?.user?.email
                                              ).split("@")[0]}
                                    </p>
                                </div>
                            </div>

                            <div className="comments">
                                <div className="comment">
                                    {questionDetails?.comments &&
                                        questionDetails?.comments?.map(
                                            (comm) => (
                                                <p key={comm._id} > 
                                                    {comm.comment}{"  "}
                                                    <span style={{background:"#ddd" , borderRadius:'5px'}}>
                                                        {comm?.user?.displayName
                                                            ? comm?.user
                                                                  ?.displayName
                                                            : String(
                                                                  comm?.user
                                                                      ?.email
                                                              ).split("@")[0]}{"  "}
                                                    </span>
                                                    {"  "}
                                                    <small>
                                                        {new Date(
                                                            comm?.created_at
                                                        ).toLocaleString()}{" "}
                                                    </small>
                                                </p>
                                            )
                                        )}
                                </div>

                                <p onClick={() => setShow(!show)}>
                                    Add a comment
                                </p>
                                {show && (
                                    <div className="title">
                                        <textarea
                                            value={comment}
                                            onChange={(e) =>
                                                setComment(e.target.value)
                                            }
                                            type="text"
                                            placeholder="add your comment..."
                                            rows={5}
                                            style={{
                                                margin: "5px 0px",
                                                padding: "10px",
                                                border: "1px solid rgba(0,0,0,0.2)",
                                                borderRadius: "3px",
                                                outline: "none",
                                            }}
                                        ></textarea>
                                        <button
                                            onClick={handleComment}
                                            style={{ maxWidth: "fit-content" }}
                                        >
                                            Add Comment
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    className="all-questions"
                    style={{ display: "flex", flexDirection: "column" }}
                >
                    <p
                        style={{
                            marginBottom: "20px",
                            fontSize: "1.1rem",
                        }}
                    >
                        {questionDetails?.answers?.length} answers
                        {questionDetails?.answers?.map((ans) => (
                            <div
                                key={ans?._id}
                                className="all-questions-container"
                            >
                                <div className="all-questions-left">
                                    <div className="all-options">
                                        <p className="arrow">▲</p>
                                        <p className="arrow">0</p>
                                        <p className="arrow">▼</p>
                                        <BookmarkIcon />
                                        <HistoryIcon />
                                    </div>
                                </div>

                                <div className="question-answer">
                                    <p>{parse(ans?.answer)}</p>
                                    <div className="author">
                                        <small>
                                            asked{" "}
                                            {new Date(
                                                ans?.created_at
                                            ).toLocaleString()}{" "}
                                        </small>
                                        <div className="author-details">
                                            <Avatar src={ans?.user?.photo} />
                                            <p>
                                                {ans?.user?.displayName
                                                    ? ans?.user?.displayName
                                                    : String(
                                                          ans?.user?.email
                                                      ).split("@")[0]}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </p>
                </div>
            </div>

            <div className="main-answer">
                <h3
                    style={{
                        fontSize: "22px",
                        margin: "10px 0",
                        fontWeight: 400,
                    }}
                >
                    Your Answer
                </h3>
                <ReactQuill
                    value={answer}
                    onChange={handleQuill}
                    className="react-quill"
                    theme="snow"
                    // style={{ height: "200px" }}
                />
            </div>
            <button
                type="submit"
                onClick={handleSubmit}
                style={{ maxWidth: "fit-content" }}
            >
                Post your Answer
            </button>
        </div>
    );
};

export default MainQuestion;
