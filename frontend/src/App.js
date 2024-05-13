import React, { useEffect } from "react";
import "./App.css";

import { BrowserRouter as Router, Routes, Route , Navigate} from "react-router-dom";

import Header from "./components/header/Header";
import HomeIndex from "./components/StackOverFlow/HomeIndex.jsx";
import AddQuestion from "./components/addQuestion/AddQuestion.jsx";
import Index from "./components/ViewQuestion/Index.jsx";
import Auth from "./components/auth/Auth.jsx";

import { useSelector, useDispatch } from "react-redux";
import { login, logout, selectUser } from "./features/userSlice.js";
import { auth } from "./firebase.js";

function App() {
    const user = useSelector(selectUser);
    const dispatch = useDispatch();

    useEffect(() => {
        auth.onAuthStateChanged((authUser) => {
            if (authUser) {
                dispatch(
                    login({
                        uid: authUser.uid,
                        photo: authUser.photoURL,
                        displayName: authUser.displayName,
                        email: authUser.email,
                    })
                );
            } else {
                dispatch(logout());
            }
        });
    }, [dispatch]);

    const PrivateRoute = ({children}) => {
    
        return (
            user ? children : <Navigate to='/auth' />
        );
    };
    // const PrivateRoute = ({ component: Component, ...rest }) => {
    //     const navigate = useNavigate();
    
    //     return (
    //         <Route
    //             {...rest}
    //             render={(props) =>
    //                 user ? (
    //                     <Component {...props} />
    //                 ) : (() => {
    //                     navigate("/auth", { state: { from: props.location } });
    //                     return null; // Returning null to avoid rendering anything
    //                 })()
    //             }
    //         />
    //     );
    // };


    return (
        <div className="App"> 
            <Router>
                <Header />
                <Routes>
                    <Route path="/" element={<PrivateRoute><HomeIndex/></PrivateRoute>} />
                    <Route path="/add-question" element={<PrivateRoute><AddQuestion/></PrivateRoute>}/>
                    <Route path="/question" element={<PrivateRoute><Index/></PrivateRoute>} />
                    <Route path="/auth" element={<Auth />} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
