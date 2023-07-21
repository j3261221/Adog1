'use client'
import { useState } from "react";


export default function PriceDropdown(props) {
    const { clickModal, categoryChange, resetFilter, categoryInput } = props

    const [steamRate, setSteamRate] = useState('0');
    const [metascore, setMetascore] = useState('0');

    return (
        <>
            <div className="overlay" onClick={clickModal}></div>
            <div className='filter-content'>
                <div className="filter-wrap">
                    <div className='numeric-filter' onClick={(e) => e.stopPropagation()}>
                        <div className='filter-list relative'>
                            <div className='range-wrapper d-flex flex-column flex-wrap flex-justify-center'>
                                <div className="range-title">스팀 평가</div>
                                <div className="range-slider-container">
                                    <div className="range-slider-wrapper">
                                        <input
                                            className="range-slider"
                                            type="range"
                                            min={0}
                                            max={100}
                                            step={1}
                                            placeholder="0"
                                            name="steamRating"
                                            value={steamRate}
                                            onChange={(event) => {
                                                setSteamRate(event.target.valueAsNumber);
                                                categoryInput(event);
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="range-container d-flex flex-justify-end">
                                <div className='range-wrapper' style={{ width: "25%", margin: "0" }}>
                                    <input type='text' autoComplete='off' className='input-slider-range range-item range-input' name='steamRating' onChange={categoryInput}  value={steamRate} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="filter-wrap">
                    <div className='numeric-filter' onClick={(e) => e.stopPropagation()}>
                        <div className='filter-list relative'>
                            <div className='range-wrapper d-flex flex-column flex-wrap flex-justify-center'>
                                <div className="range-title">메타스코어</div>
                                <div className="range-slider-container">
                                    <div className="range-slider-wrapper">
                                        <input
                                            className="range-slider"
                                            type="range"
                                            min={0}
                                            max={100}
                                            step={1}
                                            placeholder="0"
                                            name="metacritic"
                                            value={metascore}
                                            onChange={(event) => {
                                                setMetascore(event.target.valueAsNumber);
                                                categoryInput(event);
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="range-container d-flex flex-justify-end">
                                <div className='range-wrapper' style={{ width: "25%", margin: "0" }}>
                                    <input type='text' placeholder={metascore} autoComplete='off' className='input-slider-range range-item range-input' name='metacritic' onBlur={categoryInput}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='filter-reset-button-container'>
                    <div className='line'>
                        <span className='filter-reset-button'>
                            <span className='reset-btn-label' onClick={resetFilter}>필터 리셋</span>
                        </span>
                    </div>
                </div>
            </div>
        </>
    )
}