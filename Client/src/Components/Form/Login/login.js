import React from "react";
import Logo from './1.jpg'
import './login.css'


export default function Login() {

    return (
        <div className="container">
            <div className="container__left">
                <img src={Logo} alt="Pc-Build" />
            </div>
            <div className="container__right">
                <div className="content">
                    <p className="header">Sign In to boAt</p>
                    <div className="logBtn">
                        <button className="btn3"><i class='bx bxl-google'></i>Login with Google</button>
                        <button className="btn4"><i class='bx bxl-gmail'></i>Login with Email</button>
                    </div>
                    <div className="divider">
                        <span>OR</span>
                    </div>
                    <form>
                        <div className="input__group">
                            <input type="text" />
                            <label for="username">Email</label>
                        </div>
                        <div className="input__group">
                            <input type="password" />
                            <label for="password">Password</label>
                        </div>
                        <p><a href="#">Forgot password?</a></p>
                        <button className="btn1">Sign In</button>
                        <button className="btn2">Register Now</button>
                    </form>

                </div>
            </div>
        </div>
    )
}