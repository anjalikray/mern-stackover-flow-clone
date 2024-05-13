import React from "react";
import "./css/Header.css";
import SearchIcon from "@mui/icons-material/Search";
import InboxIcon from "@mui/icons-material/Inbox";
import HelpIcon from "@mui/icons-material/Help";
import {Avatar} from '@mui/material'

import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";
import { auth } from "../../firebase";

const Header = () => {
    const user = useSelector(selectUser);
    const navigate = useNavigate();

    return (
        <header>
            <div className="header-container">
                <div className="header-left">
                    <Link to="/">
                        <img
                            src="https://stackoverflow.design/assets/img/logos/so/logo-stackoverflow.svg"
                            alt="logo"
                        />
                    </Link>
                    <h3>Products</h3>
                </div>

                <div className="header-middle">
                    <div className="header-search-container">
                        <SearchIcon />
                        <input type="text" placeholder="Search..." />
                    </div>
                </div>

                <div className="header-right">
                    <div className="header-right-container">
                        <span
                            onClick={() => {
                                auth.signOut()
                                navigate('/auth')
                            }}
                        >
                            <Avatar src={user?.photo} />
                        </span>
                        <InboxIcon />
                        <HelpIcon />
                        <img
                            src="https://stackoverflow.design/assets/img/logos/se/se-icon.png"
                            alt="exchange"
                        />
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
