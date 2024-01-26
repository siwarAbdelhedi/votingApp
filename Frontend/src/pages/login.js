import React, { useState } from 'react';
import api from '../services/api' ;

function Login (){
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');

    

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(email);
        console.log(pass);
        try {
            const response = await api.login({ email, pass });
            console.log(response.user);
            localStorage.setItem("token", response.token);
            localStorage.setItem("userData", JSON.stringify(response.user));

            setEmail("");
            setPass("");
            if (response.user.role === 1) {
                window.location.href = '/landingPage';   
            }
            else {
                window.location.href = '/adminPage';
            }
        } catch (error) {
            console.error("Login error:", error);
        }
    }
    
   
    return (
        <div className="auth-form-container">
        <h2>Login</h2>
            <form className="login-form" onSubmit={handleSubmit}>
                <label htmlFor="email">email</label>
                <input value={email} onChange={(e) => setEmail(e.target.value)}type="email" placeholder="youremail@gmail.com" id="email" name="email" />
                <label htmlFor="password">password</label>
                <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="********" id="password" name="password" />
                <button type="submit">Log In</button>
            </form>
        </div>
    );
}

export default Login;