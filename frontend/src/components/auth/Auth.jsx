import { useState } from "react";
import "./auth.css";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signInWithPopup,
} from "firebase/auth";
import { auth, provider } from "../../firebase";
import { useNavigate } from "react-router-dom";

const Auth = () => {
    const [register, setRegister] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const handleSigninGoogle = () => {
        signInWithPopup(auth, provider).then((res) => {
            navigate("/")
            console.log(res);
        });
    };

    const handleRegister = (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);
        if (email === "" || password === "" || username === "") {
            setError("Required field is missing");
            setLoading(false)
        } else {
            createUserWithEmailAndPassword(auth, email, password)
                .then((res) => {
                    navigate("/")
                    setLoading(false);
                    console.log(res);
                })
                .catch((error) => {
                    console.log(error);
                    setError(error.message);
                    setLoading(false);
                });
        }
    };

    const handleSignin = (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);
        if (email === "" || password === "") {
            setError("Required field is missing");
            setLoading(false);
        } else {
            signInWithEmailAndPassword(auth, email, password)
                .then((res) => {
                    console.log(res);
                    setLoading(false);
                    navigate("/")
                })
                .catch((error) => {
                    console.log(error.code);
                    setError(error.message);
                    setLoading(false);
                });
        }
    };

    return (
        <div className="auth">
            <div className="auth-container">
                <p>
                    Add another way to log in using any of the following
                    services.
                </p>
                <div className="sign-options">
                    <div onClick={handleSigninGoogle} className="single-option">
                        <img
                            src="https://lh3.googleusercontent.com/COxitqgJr1sJnIDe8-jiKhxDx1FrYbtRHKJ9z_hELisAlapwE9LUPh6fcXIfb5vwpbMl4xl9H9TRFPc5NOO8Sb3VSgIBrfRYvW6cUA"
                            alt="google logo"
                        />
                        <p>Login with Google</p>
                    </div>
                </div>

                <div className="auth-login">
                    <div className="auth-login-container">
                        {register ? (
                            <>
                                <div className="input-field">
                                    <p>Username</p>
                                    <input
                                        type="text"
                                        value={username}
                                        onChange={(e) =>
                                            setUsername(e.target.value)
                                        }
                                    />
                                </div>

                                <div className="input-field">
                                    <p>Email</p>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        }
                                    />
                                </div>

                                <div className="input-field">
                                    <p>Password</p>
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) =>
                                            setPassword(e.target.value)
                                        }
                                    />
                                </div>

                                <button
                                    onClick={handleRegister}
                                    disabled={loading}
                                    style={{ marginTop: "10px" }}
                                >
                                    {loading ? "Registering..." : "Register"}
                                </button>
                            </>
                        ) : (
                            <>
                                <div className="input-field">
                                    <p>Email</p>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        }
                                    />
                                </div>

                                <div className="input-field">
                                    <p>Password</p>
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) =>
                                            setPassword(e.target.value)
                                        }
                                    />
                                </div>

                                <button
                                    onClick={handleSignin}
                                    disabled={loading}
                                    style={{ marginTop: "10px" }}
                                >
                                    {loading ? "Signing In..." : "Login"}
                                </button>
                            </>
                        )}
                        <p
                            onClick={() => setRegister(!register)}
                            style={{
                                marginTop: "10px",
                                textAlign: "center",
                                color: "#0095ff",
                                textDecoration: "underline",
                                cursor: "pointer",
                            }}
                        >
                            {register ? "Login" : "Register"}?
                        </p>
                    </div>
                </div>
                {error !== "" && (
                    <p style={{ color: "red", fontSize: "14px" }}>{error}</p>
                )}
            </div>
        </div>
    );
};

export default Auth;
