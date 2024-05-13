import { Link } from "react-router-dom";
import { Avatar } from "@mui/material";
import parse from 'html-react-parser';


import './css/allQuestion.css';

const AllQuestion = ({question}) => {

    const tags = question?.tags || [] 

    function truncate(str , n) {
        return str?.length > n ? str.substr(0 , n-1) + '...' : str   
    }

    return(
        <div className="all-questions">
            <div className="all-questions-container">
 
                <div className="all-questions-left">
                    <div className="all-options">
                        <div className="all-option">
                            <p>0</p>
                            <span>Votes</span>
                        </div>
                        <div className="all-option">
                            <p>{question?.answers?.length}</p>
                            <span>answers</span>
                        </div>
                        <div className="all-option">
                            <small>0 Views</small>
                        </div>
                    </div>
                </div>

                <div className="question-answer">
                    <Link to={`/question?id=${question._id}`}>{question?.title}</Link>

                    <div styled={{width:'90%'}}>
                        <div>
                        {parse(truncate(question?.body , 200))}
                        </div>
                    </div>

                    <div style={{display: 'flex'}}>{
                        tags.map((tag) => (
                        <span className="question-tags">{tag}</span>
                    ))
                    }</div>                   
                    

                    <div className="author">
                        <small>{new Date(question?.created_at).toLocaleString()}</small>
                        <div className="author-details">
                            <Avatar src={question?.user?.photo} />
                            <p>{question?.user?.displayName ? question?.user?.displayName : String(question?.user?.email).split('@')[0]}</p>
                        </div>
                    </div>
                </div>             
               
            </div>
        </div>
    )    
}

export default AllQuestion;