import { FilterList } from '@mui/icons-material';
import {Link} from 'react-router-dom';
import './css/main.css';

import AllQuestion from './AllQuestion';

const Main = ({questions}) => {
    return(
        <>
            <div className="main">
                <div className="main-container">
                    <div className="main-top">
                        <h2>All Questions</h2>
                        <Link to='/add-question'><button>Ask Questions</button></Link>                        
                    </div>

                    <div className='main-des'>
                        <p>{questions && questions.length} Questions</p>
                        <div className='main-filter'>
                            <div className='main-tags'>

                                <div className="main-tag">
                                    <Link>Newest</Link>
                                </div>
                                <div className="main-tag">
                                    <Link>Active</Link>
                                </div>
                                <div className="main-tag">
                                    <Link>More</Link>
                                </div>

                            </div>

                            <div className='main-filter-item'>
                                <FilterList />
                                <p>Filter</p>
                            </div>
                        </div>
                    </div>

                    <div className='questions'>

                        {
                            questions.map((ques, index) => (<><div key={index} className="question">
                            <AllQuestion question ={ques} />
                        </div></>))
                        }

                        
                    </div>
                </div>                
            </div>
        </>
    )
}

export default Main;