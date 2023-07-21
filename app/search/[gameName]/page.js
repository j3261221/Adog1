'use client'
import { SearchBox, SearchListItem } from "@/styles/Search.style";
import axios from "axios";
import Link from "next/link";
import TopMenu from "@/app/component/topmenu"
import Navbar from "@/app/component/navbar"

export default async function SearchResult(props) {
    let searchList
    const gameName = props.params.gameName;
    await axios.get(`https://www.cheapshark.com/api/1.0/games?title=${gameName}`)
        .then(res => {
            searchList = res.data;
        })
    return (
        <div className="background">
            <TopMenu />
            <Navbar />
            <div className="main-content">
                <div className="page relative">
                    <div className="container">
                        <SearchBox>
                            {searchList.map((list) => (
                                <SearchListItem key={list.cheapestDealID}>
                                    <div>
                                        <Link href={`/detail/${list?.cheapestDealID}`}>
                                            <div className="game-image">
                                                <span className="browseThumb" style={{ backgroundImage: `url(${list.thumb})` }}></span>
                                            </div>
                                        </Link>
                                        <div>
                                            <Link href={`/detail${list.dealIDID}`}>{list.external}</Link>
                                        </div>
                                    </div>
                                </SearchListItem>
                            )
                            )}
                        </SearchBox>
                    </div>
                </div>
            </div>
        </div>

    )
}