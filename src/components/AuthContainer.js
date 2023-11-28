import React from 'react'
import {useState} from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import {Navigate, redirect, useNavigate} from "react-router-dom";

function AuthContainer() {

    const navigate = useNavigate();
    const containerStyle = {
        minHeight: "70%",
        width: "70%",
        backgroundColor: "white",
        borderRadius: "30px",
        boxShadow: "rgba(220, 53, 69, 0.4) 5px 5px, rgba(220, 53, 69, 0.3) 10px 10px, rgba(220, 53, 69, 0.2) 15px 15px, rgba(220, 53, 69, 0.1) -20px 20px, rgba(240, 46, 170, 0.05) -25px 25px"
    };

    const formStyle = {
        border: "  2px",
        margin: "5rem",
    };
    const [username, setUsername] = useState("");
    const [usernameError, setUsernameError] = useState("");
    const [password, setPassword] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [loginError, setLoginError] = useState("");

    const handleSubmitLogin = () => {

        if (password.length === 0 && username.length === 0) {

            setLoginError("Fill in all fields!");
        } else if (password.length === 0 || username.length === 0) {
            setLoginError("");

            if (username.length === 0) {
                setUsernameError("Enter a valid username!");
            } else {
                setUsernameError("");
            }
            if (password.length === 0) {
                setPasswordError("password is left blank");
            } else {
                setPasswordError("");
            }
        } else {

            setPasswordError("");
            const url = 'http://localhost/ticketApi/login.php';
            let fData = new FormData();
            fData.append('username', username);
            fData.append('password', password);
            axios.post(url, fData)
                .then(response => {
                    if (response.data.email === username && response.data.password === password) {
                        sessionStorage.setItem('id',response.data.id)
                        sessionStorage.setItem('role',response.data.type)
                        if(response.data.type === 'CLIENT') navigate("/myap");
                        else navigate("/clients")
                    } else setLoginError("Wrong Login");
                })
                .catch(error => setLoginError(error));

        }
    }

    return (
        <div className="  d-flex justify-content-center align-items-center">
            <div className="" style={containerStyle}>
                <h2 className="text-center mt-4 text-success">Login</h2>
                <div style={formStyle}>
                    <Form>
                        <Form.Group className="mb-1" controlId="loginUsername">
                            <Form.Control value={username} onChange={(e) => setUsername(e.target.value)} type="text"
                                          placeholder="Username"/>
                        </Form.Group>
                        <p className="mb-5 text-danger">{usernameError}</p>
                        <Form.Group className="mb-1" controlId="loginPassword">
                            <Form.Control type="password" placeholder="Password" value={password}
                                          onChange={(e) => setPassword(e.target.value)}/>
                        </Form.Group>
                        <p className="mb-5 text-danger">{passwordError}</p>
                        <div className="d-grid gap-2 col-6 mx-auto mb-3">
                            <Button className="btn btn bg-success text-white" type='button' value='submitLogin'
                                    name='submitLogin' onClick={handleSubmitLogin}>
                                Log In
                            </Button>
                        </div>
                        <div className='text-center'>
                            <p className="mb-5">{loginError}</p>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    );
}

export default AuthContainer;