import { useState } from 'react';
import PriceDropdown from './price';
import ReviewDropdown from './review';
import StoreDropdown from './store';
import SortByDropdown from './sortBy';

export default function FilterDropdown(props) {
    const { name, categoryChange, resetFilter, categoryInput, storeList } = props

    const [showModal, setShowModal] = useState(false)

    const clickModal = () => {
        setShowModal(!showModal)
    }
    let dropdown;

    if (name === '가격') {
        dropdown = <PriceDropdown clickModal={clickModal} categoryChange={categoryChange} resetFilter={resetFilter} categoryInput={categoryInput} />;
    } else if (name === '평가') {
        dropdown = <ReviewDropdown clickModal={clickModal} categoryChange={categoryChange} resetFilter={resetFilter} categoryInput={categoryInput}/>;
    } else if (name === '스토어') {
        dropdown = <StoreDropdown clickModal={clickModal} categoryChange={categoryChange} resetFilter={resetFilter} categoryInput={categoryInput} storeList={storeList}/>;
    } else if (name === '정렬') {
        dropdown = <SortByDropdown clickModal={clickModal} categoryChange={categoryChange} resetFilter={resetFilter} categoryInput={categoryInput} />;
    }

    return (
        <div className='filter-dropdown relative'>
            <span className='current d-flex flex-align-center flex flex-justify-eachend ' onClick={clickModal}>
                <span className='text'>{name}</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className={showModal ? "bi bi-caret-up-fill tridown" : ""} viewBox="0 0 16 16">
                    <path d="m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z" />
                </svg>
                {showModal && dropdown}
            </span>
        </div>
    );
}

