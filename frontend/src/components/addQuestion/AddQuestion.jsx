import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { TagsInput } from "react-tag-input-component";
import { useNavigate } from "react-router-dom";

import "./css/addQuestion.css";
import { useState } from "react";
import { selectUser } from "../../features/userSlice";
import { useSelector } from "react-redux";
import axios from "axios";

const AddQuestion = () => {
    const user = useSelector(selectUser);

    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [tags, setTags] = useState([]);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleQuill = (value) => {
        setBody(value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (title !== "" && body !== "") {
            setLoading(true)
            const bodyJSON = { 
                title: title,
                body: body,
                tag: tags,
                user: user,
            };

            await axios
                .post("/api/question", bodyJSON)
                .then((res) => {
                    alert("Question added successfully");
                    setLoading(false)
                    navigate("/");
                })
                .catch((err) => {
                    console.log(err);
                    setLoading(false)
                });
        }
    };

    return (
        <div className="add-question">
            <div className="add-question-container">
                <div className="head-title">
                    <h1>Ask a Public Question</h1>
                </div>

                <div className="question-component">
                    <div className="question-options">
                        <div className="question-option">
                            <div className="title">
                                <h3>Title</h3>
                                <small>
                                    Be specific and imagine you're asking a
                                    question to another person
                                </small>
                                <input
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    type="text"
                                    placeholder="add the question title"
                                />
                            </div>
                        </div>

                        <div className="question-option">
                            <div className="title">
                                <h3>What are the details of your problem?</h3>
                                <small>
                                    Introduce the problem and expand on what you
                                    put in the title.
                                </small>
                                <ReactQuill
                                    value={body}
                                    onChange={handleQuill}
                                    className="react-quill"
                                    theme="snow"
                                />
                            </div>
                        </div>

                        <div className="question-option">
                            <div className="title">
                                <h3>Tags</h3>
                                <small>
                                    Add up to 5 tags to describe what your
                                    question is about.
                                </small>
                                <TagsInput
                                    name="tags"
                                    placeHolder="press enter to add new tag"
                                    value={tags}
                                    onChange={setTags}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <button disabled={loading} type="submit" onClick={handleSubmit} className="button">
                    {loading ? "Adding your Question..." : "Add Your Question"}
                </button>
            </div>
        </div>
    );
};

export default AddQuestion;
