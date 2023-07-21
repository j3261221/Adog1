'use client'
import { useState } from "react";


export default function SortByDropdown(props) {
    const { clickModal, categoryChange, resetFilter, categoryInput } = props


    return (
        <>
            <div className="overlay" onClick={clickModal}></div>
            <div className='filter-content' style={{width:"108px", height:"210px"}}>
                <div className="filter-wrap">
                    <div className='numeric-filter' >
                        <div className='filter-list relative'>
                            <div className='range-wrapper d-flex flex-column flex-wrap'>
                                <span className='sort-item ellipsis badge badge-filter'
                                    onClick={categoryChange}
                                    name='sortBy'
                                    value='DealRating'
                                >
                                    추천순
                                </span>

                                <span className='sort-item ellipsis badge badge-filter'
                                    onClick={categoryChange}
                                    name='sortBy'
                                    value='Recent'
                                >
                                    최신순
                                </span>

                                <span className='sort-item ellipsis badge badge-filter'
                                    onClick={categoryChange}
                                    name='sortBy'
                                    value='Savings'
                                >
                                    할인순
                                </span>

                                <span className='sort-item ellipsis badge badge-filter'
                                    onClick={categoryChange}
                                    name='sortBy'
                                    value='Price'
                                >
                                    가격순
                                </span>

                                <span className='sort-item ellipsis badge badge-filter'
                                    onClick={categoryChange}
                                    name='sortBy'
                                    value='Reviews'
                                >
                                    리뷰순
                                </span>

                                <span className='sort-item ellipsis badge badge-filter'
                                    onClick={categoryChange}
                                    name='sortBy'
                                    value='Title'
                                >
                                    제목순
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}