"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import React from "react";

const LoginButton = () => {
  const { data: session } = useSession();
  return (
    <li className="top-side-menu-item d-flex flex-justify-eachend flex-align-center login">
      {session?.user ? (
        <>
          <p className="fc-white fs-14"> {session.user.name}님 환영합니다</p>
          <a className="top-side-menu-link relative fc-white text-align-center" onClick={() => signOut()}>
          로그아웃
          </a>
        </>
      ) : (
        <>
          <p className="fc-white"> </p>
          <a className="top-side-menu-link relative fc-white text-align-center" onClick={() => signIn()}>
            로그인
          </a>
        </>
      )}

    </li>
  );
};

export default LoginButton;