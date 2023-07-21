'use client'

import "../../../styles/auth.css";
import { getProviders, signIn, useSession } from "next-auth/react";
import { useEffect, useRef, useState } from 'react';


const LoginPage = () => {
    const email = useRef("");
    const pass = useRef("");
    const [isSignup, setIsSignup] = useState(true)

    const onSubmit = async () => {
        const result = await signIn("credentials", {
            email: email.current,
            password: pass.current,
            redirect: true,
            callbackUrl: "/",
        });
    };

    return (
        <div className="loginBody">
            <div className={isSignup ? "login-container" : "login-container right-panel-active"} id="container">
                <div className="form-container sign-up-container">
                    <form action="/api/auth/signup" method="POST">
                        <div className="social-container d-flex flex-align-center">
                            <a href="#" className="social" onClick={() => signIn("google")} >
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-google" viewBox="0 0 16 16">
                                    <path d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z" />
                                </svg>
                            </a>
                        </div>
                        <span style={{ color: "black" }}>or use your email for registration</span>
                        <input className="inputBox" name="name" type="text" placeholder="이름" autoComplete="off" />
                        <input className="inputBox" name="email" type="email" placeholder="이메일" autoComplete="off" />
                        <input className="inputBox" name="password" type="password" placeholder="비밀번호" />
                        <button className="pointer">회원가입</button>
                    </form>
                </div>
                <div className="form-container sign-in-container">
                    <form>
                        <div className="social-container">
                            <a href="#" className="social" onClick={() => { signIn('google') }}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-google" viewBox="0 0 16 16">
                                    <path d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z" />
                                </svg>
                            </a>
                        </div>
                        <span style={{ color: "black" }}>or use your account</span>
                        <input className="inputBox" type="email" onChange={(e) => (email.current = e.target.value)} placeholder="이메일" />
                        <input
                            className="inputBox"
                            type="password"
                            placeholder="비밀번호"
                            onChange={(e) => (pass.current = e.target.value)}
                        />
                        <a href="#">비밀번호를 잊으셨나요?</a>
                        <button className="pointer" onClick={onSubmit}>로그인</button>
                    </form>
                </div>
                <div className="overlay-container">
                    <div className="overlay">
                        <div className="overlay-panel overlay-left">
                            <h1>다시 오셨군요</h1>
                            <p>이전에 입력하셨던 정보로 로그인 하세요</p>
                            <button className="ghost pointer" id="signIn" onClick={() => { setIsSignup(true) }}>로그인</button>
                        </div>
                        <div className="overlay-panel overlay-right">
                            <h1>처음 방문하신다면</h1>
                            <p>ADOG에 회원가입하시고<br />
                                더 많은 유용한 정보들을 만나보세요</p>
                            <button className="ghost pointer" id="signUp" onClick={() => { setIsSignup(false) }}> 회원가입

                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default LoginPage;