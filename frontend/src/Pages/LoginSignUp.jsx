import React from 'react'
import './LoginSignUp.css';
import { useState } from "react"; 
import { useAuth } from '../Context/AuthContext';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';

const PasswordErrorMessage = () => {
    return (
        <p className="FieldError">Password should have at least 4 characters</p>
    );
};
  
export const LoginSignUp = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState({
        value: "",
        isTouched: false,
    });
    const [loginError, setLoginError] = useState("");
    const { login } = useAuth();
    const navigate = useNavigate();

    const getIsFormValid = () => {
        return (
            validateEmail(email) &&
            password.value.length >= 4
        );
    };
    
    const validateEmail = (email) => {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    };

    const clearForm = () => {
        setEmail("");
        setPassword({
            value: "",
            isTouched: false,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:3001/user/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password: password.value }),
            });

            const data = await response.json();

            if (response.ok) {
                login({ email });
                alert("Logged In");
                clearForm();
                navigate('/');
            } else {
                setLoginError(data.message);
            }
        } catch (error) {
            setLoginError("An error occurred. Please try again later.");
        }
    };

    return (
        <div className="App">
            <form onSubmit={handleSubmit}>
                <fieldset>
                    <h2>Login</h2>
                    <div className="Field">
                        <label>
                            Email Address <sup>*</sup>
                        </label>
                        <input
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value);
                            }}
                            placeholder="Email address"
                        />
                    </div>
                    <div className="Field">
                        <label>
                            Password <sup>*</sup>
                        </label>
                        <input
                            value={password.value}
                            type="password"
                            onChange={(e) => {
                                setPassword({ ...password, value: e.target.value });
                            }}
                            onBlur={() => {
                                setPassword({ ...password, isTouched: true });
                            }}
                            placeholder="Password"
                        />
                        {password.isTouched && password.value.length < 4 ? (
                            <PasswordErrorMessage />
                        ) : null}
                    </div>
                    {/* <div className="Field">
                        <label>
                            Role <sup>*</sup>
                        </label>
                        <select value={role} onChange={(e) => setRole(e.target.value)}>
                            <option value="role" disabled>Select Role</option>
                            <option value="user">User</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div> */}
                    {loginError && <p className="FieldError">{loginError}</p>}
                    <button className="submit" type="submit" disabled={!getIsFormValid()}>
                        Login
                    </button>
                </fieldset>
            </form>
        </div>
    );
};

const App = () => (
    <Router>
        <Routes>
            <Route path="/" element={<LoginSignUp />} />
        </Routes>
    </Router>
);

export default App;