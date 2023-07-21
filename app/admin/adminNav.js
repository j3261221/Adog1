'use client'

import Link from "next/link";
import "../../styles/navbar.scss"

export default function AdminNav() {

    return (
        <nav className="gnb relative">
            <div className="container">
                <div className="mainmenu-wrapper d-flex flex-row flex-nowrap flex-align-center">
                    <Link className="logo relative" href="/">
                        <img src="/logo.png" height="50px" />
                    </Link>
                    <div className={`d-flex flex-column top-menu bottom-mobile-wrapper`}>
                        <ul className="top-menu-list fs-14 d-flex flex-row flex-nowrap flex-align-center" style={{width:"500px"}}>
                            {/* <li className="list-item"><a href="">Deals</a></li> */}
                            <li className="main-menu-item top-menu-list-item relative text-align-center" ><a href="/admin/slide">슬라이드 수정</a></li>
                            <li className="main-menu-item top-menu-list-item relative text-align-center"><a href="">공지사항 수정</a></li>
                        </ul>
                    </div>

                </div>
            </div>
        </nav >


    )
}
