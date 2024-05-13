import Sidebar from "./Sidebar";
import Main from "./Main";
import './css/index.css'
import { useEffect, useState } from "react";
import axios from "axios";

const HomeIndex = () => {

    const [questions , setQuestions] = useState([]) 

    useEffect(()=>{
        async function getQuestion () {
            await axios.get('/api/question').then((res) => {
                // console.log(res.data)
                setQuestions(res.data.reverse())
            }).catch((err) => {
                console.log(err)
            })
        }
        getQuestion()
    } , [])

    return(
        <div className="stack-index">
            <div className="stack-index-content">
                <Sidebar />
                <Main questions ={questions} />
            </div>          
              
        </div>
    )
}

export default HomeIndex;