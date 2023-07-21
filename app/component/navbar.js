'use client'

import Link from "next/link";
import LoginButton from "./LoginButton";
import HeaderSearch from "../search/headerSearch";
import "../../styles/navbar.scss"
import { useState } from "react";
import { useEffect } from "react";

export default function Navbar() {
    const [searchClick, setSearchClick] = useState(true);
    const [searchWidth, setSearchWidth] = useState("100%")
    const [navClass, setNavClass] = useState("")
    const clickSearch = () => {
        setSearchClick(!searchClick)
    }

    useEffect(() => {
        setSearchWidth(searchClick ? "314px" : "700px");
        setNavClass(searchClick ? "" : "search-open")
    }, [searchClick]);

    return (
        <nav className="gnb relative">
            <div className="container">
                <div className="mainmenu-wrapper d-flex flex-row flex-nowrap flex-align-center">
                    <Link className="logo relative" href="/">
                        <img src="/logo.png" height="50px" />
                    </Link>
                    <div className={`d-flex flex-column top-menu bottom-mobile-wrapper ${navClass}`}>
                        <ul className="top-menu-list fs-14 d-flex flex-row flex-nowrap flex-align-center">
                            {/* <li className="list-item"><a href="">Deals</a></li> */}

                            <li className="main-menu-item top-menu-list-item relative text-align-center"><a href="">공지사항</a></li>
                            <li className="dropdown dropdown-toggle more main-menu-item top-menu-list-item relative d-flex flex-align-center flex-justify-center">
                                <img src="/dot.png" className="dot" />
                            </li>
                        </ul>
                    </div>
                    <HeaderSearch clickSearch={clickSearch} searchWidth={searchWidth} />
                    <div className={`top-sidemenu relative ${navClass}`}>
                        <ul className="top-sidemenu-list d-flex flex-align-center flex-row flex-nowrap">
                            <LoginButton />
                            <li className="profile"><a href=""> <img src="/profile.png" alt="" width="30px" height="30px" /></a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav >


    )
}
