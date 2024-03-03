import React from "react";
import { Link,useNavigate } from "react-router-dom"
import { useState } from "react"
import axios from "axios"


function Login(){
    const  [email, setEmail] = useState()
    const  [password, setPassword] = useState()

    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post('http://localhost:3001/users/signin',{email,password})
        .then((result)=>{
            console.log(result)
            const { token } = result.data;
            const { userId } = result.data.user._id;
            if(result){
                localStorage.setItem('token', token);
                localStorage.setItem('userId', userId);
                navigate('/home')
            }
            
        })
        .catch((err)=>console.log(err))
    }

    return (
        <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
            <div className="bg-white p-3 rounded w-50  ">
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="email">
                            <strong>Email</strong>
                        </label>
                        <input 
                            placeholder="Enter Email"
                            type="email"
                            autoComplete="off"
                            name="email"
                            className="form-control rounded-0" 
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password">
                            <strong>Password</strong>
                        </label>
                        <input 
                            placeholder="Enter Password"
                            type="password"
                            autoComplete="off"
                            name="password"
                            className="form-control rounded-0" 
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="btn btn-success w-100 rounded-0 ">
                        Login
                    </button>
                </form>

                <p>Already have an account?</p>
                <Link to="/signup" className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none">
                    Sign Up
                </Link>
                
            </div>        
        </div>
    )
}

export default Login;   