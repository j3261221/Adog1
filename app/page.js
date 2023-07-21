'use client'

import { useRef, useState } from "react"
import Navbar from "@/app/component/navbar"
import Slider from "@/app/component/slider"
import GameBox from "@/app/component/gameBox"
import TopMenu from "@/app/component/topmenu"
import { useEffect } from "react"
import { useObserver } from "./component/browse/useObserver"
import useGetGameList from "./component/browse/GameList"
import FilterDropdown from "@/app/component/filter/filterDropdown"
import OsDealItem from "./component/osDealItem"
import axios from "axios"

export default function Browse() {
    const [category, setCategory] = useState({
        storeID: '',
        sortBy: '',
        lowerPrice: '',
        upperPrice: '',
        AAA: '',
        title: '',
        desc: '',
        exact: '',
        metacritic: '',
        steamRating: '',
    });

    const { data, fetchNextPage, refetch } = useGetGameList(category)
    const bottom = useRef(null)
    const onIntersect = ([entry]) => entry.isIntersecting && fetchNextPage()

    useObserver({
        target: bottom,
        onIntersect,
    })

    const categoryChange = (e) => {
        const name = e.target.getAttribute('name');
        const value = e.target.getAttribute('value');
        setCategory((prevCategory) => ({
            ...prevCategory,
            [name]: prevCategory[name] == value ? "" : value,
        }));
    };

    const categoryInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setCategory((prevCategory) => ({
            ...prevCategory,
            [name]: prevCategory[name] == value ? "" : value,
        }));
        console.log({ name, value, category })
    };

    const resetFilter = (e) => {
        setCategory((prevCategory) => ({
            ...prevCategory,
            storeID: '',
            sortBy: '',
            lowerPrice: '',
            upperPrice: '',
            AAA: '',
            title: '',
            desc: '',
            exact: '',
            metacritic: '',
            steamRating: '',
        }));
    }

    const [storeList, setStoreList] = useState();

    useEffect(() => {
        axios.get(`https://www.cheapshark.com/api/1.0/stores`)
            .then(res => {
                setStoreList(res.data);
            })
    }, []);


    useEffect(() => {
        refetch();
    }, [category]);

    const uniqueList = [];
    const existingGameIDs = new Set();

    data?.pages?.forEach((pages) => {
        pages?.data?.data?.forEach((list) => {
            if (!existingGameIDs.has(list.gameID)) {
                existingGameIDs.add(list.gameID);
                uniqueList.push(list);
            }
        });
    });

    const [game, setGame] = useState();
    const [gameID, setGameID] = useState();
    const [deal, setDeal] = useState();
    const [dealID, setDealID] = useState();
    const [innerPrice, setInnerPrice] = useState();

    let gameDealPrice;
    let gameCheapestPrice;

    const metascore = deal?.gameInfo?.metacriticScore;

    let metacolor
    if (75 < Number(metascore)) {
        metacolor = "score-high";
    }
    else if (50 >= Number(metascore)) {
        metacolor = "score-row";
    }
    else {
        metacolor = "score-med";
    }

    useEffect(() => {
        axios.get(`https://www.cheapshark.com/api/1.0/games?id=${gameID}`)
            .then(res => {
                setGame(res.data);
                gameCheapestPrice = game?.cheapestPriceEver?.price;
                gameDealPrice = game?.deals[0]?.price;

                if (gameDealPrice == "0.00") {
                    setInnerPrice(
                        <span className="inline price-inner numeric">
                            Free
                        </span>
                    )
                }
                else if (gameCheapestPrice >= gameDealPrice) {
                    setInnerPrice
                        (<span className="inline price-inner numeric">
                            ${gameDealPrice}
                        </span>)
                }
                else {
                    setInnerPrice
                        (<span className="inline price-inner numeric">
                            ${gameCheapestPrice}
                        </span>)
                }
            })
    }, [gameID]);

    useEffect(() => {
        axios.get(`https://www.cheapshark.com/api/1.0/deals?id=${dealID}`)
            .then(res => {
                setDeal(res.data);
            })
    }, [gameID]);


    useEffect(() => {
        if (typeof window !== 'undefined' && game?.info) {
            const sidebarGameInfoPin = () => {
                const t = window.scrollY || document.documentElement.scrollTop;
                const e = document.querySelector(".col-right").getBoundingClientRect().top + window.scrollY;
                const i = document.querySelector(".col-right").getBoundingClientRect().bottom + window.scrollY;
                const s = document.querySelector(".col-right").offsetHeight;
                const a = document.querySelector(".gnb").offsetHeight;

                if (t + a >= e) {
                    document.querySelector(".game-info-widget").classList.add("pinned");
                }
                else {
                    document.querySelector(".game-info-widget").classList.remove("pinned");
                }
            };

            window.addEventListener("scroll", sidebarGameInfoPin);

            return () => {
                window.removeEventListener("scroll", sidebarGameInfoPin);
            };
        }
    }, [game?.info]);



    return (
        <div className="background">
            <TopMenu />
            <Navbar />
            <div className="main-content">
                <div className="page relative">
                    <Slider />
                    <div className="deals-container container relative">
                        <div className="deals-content">
                            <div className="main-filter-line relative d-flex flex-column flex-nowrap">
                                <div className="filter-line d-flex flex-row flex-wrap">
                                    <div className="filters-line-container d-flex flex-row flex-justify-center">
                                        <div className="filter-search">
                                            <input type='text' name="title" placeholder='제목으로 검색' className="searchbar" autoComplete='off' onBlur={categoryInput} />
                                            <img src="/search.png" className="search-img" />
                                        </div>
                                        <FilterDropdown name="가격" categoryChange={categoryChange} resetFilter={resetFilter} categoryInput={categoryInput} />
                                        <FilterDropdown name="평가" categoryChange={categoryChange} resetFilter={resetFilter} categoryInput={categoryInput} />
                                        <FilterDropdown name="스토어" categoryChange={categoryChange} resetFilter={resetFilter} categoryInput={categoryInput} storeList={storeList} />
                                    </div>
                                </div>
                            </div>
                            <div className="sort container">
                                <div className="sort-wrap d-flex flex-justify-end">
                                    <FilterDropdown name="정렬" categoryChange={categoryChange} />
                                </div>
                            </div>
                            <div className="game-section section-row d-flex relative">
                                <div className="col-left pjax-replace list-view">
                                    <div className="d-flex flex-column wrap_items">
                                        <div className="d-flex flex-wrap relative list-items shadow-box-small-lighter">
                                            {uniqueList.map((list) => (
                                                <GameBox list={list} key={list.dealID} setGameID={setGameID} setDealID={setDealID} />
                                            ))}
                                            <div ref={bottom} />
                                        </div>
                                    </div>
                                </div>
                                {game?.info && <div className="col-right relative with-pagination">
                                    <div className="game-info-widget shadow-box-small-lighter relative">
                                        <div className="game-info-heading relative in-content">
                                            <h3 className="widget-heading">{game?.info?.title}</h3>
                                        </div>
                                        <div className="game-info-content relative">

                                            <div className="os-content ">
                                                <div className="game-info-details d-flex flex-column">
                                                    <div className="game-info-details-section">
                                                        <div className="game-info-inner-deals relative d-flex flex-column">
                                                            {game?.deals.slice(0, 3).map((deal) =>
                                                                <OsDealItem deal={deal} />
                                                            )}
                                                        </div>
                                                    </div>
                                                    <div className="game-info-details-section d-flex flex-justify-eachend" style={{ margin: '24px 30px 0px 15px' }}>
                                                        <h4 className="game-info-inner-heading">역대 최저</h4>
                                                        <p className="game-info-details-content">
                                                            {innerPrice}
                                                        </p>
                                                    </div>
                                                    <div className="game-info-details-section" style={{ margin: "24px 30px 0px 15px" }}>
                                                        <h4 className="game-info-inner-heading">평점</h4>
                                                        <div className="game-info-details-content">
                                                            <div className="score d-flex flex-wrap flex-align-center">
                                                                <div className="score-col d-flex flex-align-center flex-nowrap">
                                                                    <a target="_blank" rel="nofollow noopener external" href={`www.metacritic.com${deal?.gameInfo?.metacriticLink}`}>
                                                                        <span className={"large no-margin game-score-meta-value game-score-square " + metacolor}>
                                                                            {metascore}
                                                                        </span>
                                                                    </a>
                                                                    <div class="score-label d-flex flex-align-center" style={{ marginLeft: "10px" }}>메타스코어</div>
                                                                </div>
                                                            </div>
                                                            <div className="score full d-flex flex-wrap flex-align-center">
                                                                <div className="score-col full d-flex flex-align-center flex-wrap">
                                                                    <div className="score-heading d-flex flex-nowrap">
                                                                        <div className="score-label d-flex flex-align-center">
                                                                            스팀평점
                                                                        </div>
                                                                        <a className="score-grade" href={`https://store.steampowered.com/app/${deal?.gameInfo?.steamAppID}/`}>
                                                                            <span className="reviews-label" title={"일단 띄워봐"}>
                                                                                Very Positive
                                                                                <span>
                                                                                    (111,433)
                                                                                </span>
                                                                            </span>
                                                                        </a>
                                                                    </div>
                                                                    <span className="score-bar">
                                                                        <span className="progress-bar" style={{ width: deal?.gameInfo?.steamRatingPercent }}>
                                                                        </span>
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
