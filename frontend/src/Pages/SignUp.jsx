import React, { useState } from 'react';
import './SignUp.css';
import { useAuth } from '../Context/AuthContext';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';

const PasswordErrorMessage = () => {
    return (
        <p className="FieldError">Password should have at least 4 characters</p>
    );
};
  
export const Signup = () => {
    const [name, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState({
        value: "",
        isTouched: false,
    });
    const [signupError, setSignupError] = useState("");
    const { login } = useAuth();
    const navigate = useNavigate();

    const getIsFormValid = () => {
        return (
            name &&
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
        setFullName("");
        setEmail("");
        setPassword({
            value: "",
            isTouched: false,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:3001/user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, password: password.value }), // Mengirim data dalam body permintaan
            });

            const data = await response.json();

            if (response.ok) {
                alert("Account Created Successfully!");
                clearForm();
                navigate('/login');
            } else {
                setSignupError(data.message);
            }
        } catch (error) {
            setSignupError("An error occurred. Please try again later.");
        }
    };

    return (
        <div className="App">
            <form onSubmit={handleSubmit}>
                <fieldset>
                    <h2>Sign Up</h2>
                    <div className="Field">
                        <label>
                            Your Name <sup>*</sup>
                        </label>
                        <input
                            value={name}
                            onChange={(e) => {
                                setFullName(e.target.value);
                            }}
                            placeholder="Full name"
                        />
                    </div>
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
                    {signupError && <p className="FieldError">{signupError}</p>}
                    <button className="submit" type="submit" disabled={!getIsFormValid()}>
                        Register
                    </button>
                </fieldset>
            </form>
        </div>
    );
};

const App = () => (
    <Router>
        <Routes>
            <Route path="/" element={<Signup />} />
        </Routes>
    </Router>
);

export default App;
