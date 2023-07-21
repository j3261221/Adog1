import axios from "axios";
import moment from "moment/moment";
import Link from "next/link";

export default function GameBox(props) {
    const { list, setGameID, setDealID } = props;

    if (!list) {
        return null;
    }

    // let game
    // axios.get(`https://www.cheapshark.com/api/1.0/games?id=${list.gameID}`).then((res) => game = res.data)
    // console.log(game)
    const historical = Number(list.savings) == 100

    let howLongAgo = moment(list.lastChange, 'X').fromNow();
    const steamText = list.steamRatingText;

    let salePrice
    if (list.salePrice == "0.00") {
        salePrice = <span className="price-inner game-price-new c-green">Free</span>
    }
    else {
        salePrice = <span className="price-inner game-price-new">${list.salePrice}</span>
    }

    return (
        <div className="gameBox relative game-portrait-item grid" onMouseEnter={() => { setGameID(list.gameID); setDealID(list.dealID); }}>
            <Link
                key={list.dealID}
                href={`/detail/${list.dealID}`}
                scroll={false}
                shallow={true}
                className="full-link"
            >
            </Link>
            <div className="game-image">
                <span className="browseThumb" style={{ backgroundImage: `url(${list.thumb})` }}></span>
            </div>
            <div className="game-info-wrapper grid">
                <div className="game-info-title-wrapper d-flex flex-align-center flex-row flex-nowrap">
                    <svg className="icon-rating-high size-15 svg-icon svg-icon-fire">
                    </svg>
                    <div className="game-info-title title">
                        {list.title}
                    </div>
                </div>
                <div className="game-tags game-tags-deal">
                    <div className="d-flex flex-align-center tags">
                        <div className="review-tag tag">
                            {steamText == "Overwhelmingly Positive" ? "압도적으로 긍적적" : steamText == "Very Positive" ? "매우 긍정적" : steamText == "Positive" ? "긍정적" : steamText == "Mostly Positive" ? "대체로 긍정적" : steamText == "Mixed" ? "복합적" : steamText == "Mostly Negative" ? "대체로 부정적" : steamText == "Negative" ? "부정적" : steamText == "very Negative" ? "매우 부정적" : steamText == "Overwhelmingly Negative" ? "압도적으로 부정적" : "평가 없음"}
                        </div>
                        <div className="tag-dot"></div>
                        <div className="time-tag tag">
                            {howLongAgo}
                        </div>
                    </div>
                </div>
                <div className="price-wrapper">
                    <span className="price-old relative">${list.normalPrice}</span>
                    <div className="price relative game-price">
                        {salePrice}
                    </div>
                </div>
                <div className="labels-container d-flex flex-row">
                    <span className="discount label d-flex">-{Math.round(list.savings)}%</span>
                    {historical && <span className="historical label">역대 최저</span>}
                </div>
            </div>
            <div className="game-cta shop-icon-cta relative d-flex flex-align-center flex-row">
                <a className="shop-link d-flex flex-row flex-align-center flex-jistify-center" href={`https://www.cheapshark.com/redirect?dealID=${list.dealID}`} target="_blank" rel="nofollow noopener external">
                    <img className="shop-logo" src={`https://www.cheapshark.com/img/stores/banners/${Number(list.storeID) - 1}.png`} />
                </a>
            </div>
        </div>
    )
}
