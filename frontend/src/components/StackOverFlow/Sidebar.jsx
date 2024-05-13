import HomeIcon from '@mui/icons-material/Home';
import LiveHelpIcon from '@mui/icons-material/LiveHelp';
import BookmarksIcon from '@mui/icons-material/Bookmarks';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import WorkIcon from '@mui/icons-material/Work';
import ApartmentIcon from '@mui/icons-material/Apartment';
import ChatIcon from '@mui/icons-material/Chat';
import StarIcon from '@mui/icons-material/Star';

import { Link } from 'react-router-dom';
import './css/sidebar.css';



const Sidebar = () => {
    return(
        <div className="sidebar">
            <div className="sidebar-container">
                <div className="sidebar-options">
                    <div className="sidebar-option">
                        <HomeIcon />
                        <Link to='/'>Home</Link>
                    </div>

                    <div className="sidebar-option">
                        <LiveHelpIcon />
                        <Link>Questions</Link>                        
                    </div>

                    <div className="sidebar-option">
                        <BookmarksIcon />
                        <Link>Tags</Link>                        
                    </div>
                </div>

                <div className="sidebar-options">
                    <div className="sidebar-option">
                        <PeopleAltIcon />
                        <Link>User</Link>
                    </div>

                    <div className="sidebar-option">
                        <WorkIcon />
                        <Link>Job</Link>                        
                    </div>

                    <div className="sidebar-option">
                        <ApartmentIcon />
                        <Link>Companies</Link>                        
                    </div>
                </div>

                <div className='sidebar-options'>
                    <div className='sidebar-option'>
                        <p>LABS</p>
                        <div className='link-tag'>
                            <ChatIcon />
                            <Link>Discussions</Link>
                        </div>
                    </div>
                </div>

                <div className='sidebar-options'>
                    <div className='sidebar-option'>
                        <p>COLLECTIVES</p>
                        <div className="link-tag">
                            <StarIcon />
                            <Link>Explore Collectives</Link>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Sidebar;