import Sidebar from '../StackOverFlow/Sidebar'
import MainQuestion from './MainQuestion'
import '../StackOverFlow/css/index.css'

const Index = () => {
    return(
        <div className="stack-index">
            <div className="stack-index-content">
                <Sidebar />
                <MainQuestion />
            </div>          
              
        </div>
    )
}

export default Index;