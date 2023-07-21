'use client'

import styled from "@emotion/styled"
import { useRouter } from "next/navigation"
import { useState } from "react"
import "../../styles/navbar.scss"

export default function HeaderSearch(props) {
    const { clickSearch, searchWidth } = props;
    const [search, setSearch] = useState('');
    const router = useRouter();

    const handleChange = (e) => {
        setSearch(e.target.value);
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            router.push(`/search/${search}`);
        }
    }


    return (
        <div className="relative search-container" style={{maxWidth: searchWidth, transition: "max-width 0.5s ease"}} >
            <input type='text' placeholder='찾는 게임이 있으신가요?' className="searchbar" autoComplete='off' value={search} onChange={handleChange} onKeyDown={handleKeyDown} onFocus={clickSearch} onBlur={clickSearch} />
            <img src="/search.png" className="search-img" />
        </div>
    )
}