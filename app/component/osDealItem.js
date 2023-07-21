export default function OsDealItem(props) {
    const { deal } = props;

    let salePrice
    if (deal?.price == "0.00") {
        salePrice = <span className="price-inner game-price-new">Free</span>
    }
    else {
        salePrice = <span className="price-inner game-price-new">${deal?.price}</span>
    }

    return (
        <div className="deal-item relative d-flex flex-row flex-nowrap flex-align-center">
            <a className="full-link"></a>
            <div className="deal-image">
                <img className="shop-logo" src={`https://www.cheapshark.com/img/stores/banners/${Number(deal?.storeID) - 1}.png`} />
            </div>
            <div className="deal-info deal-info-price d-flex flex-column">
                <div className="price-wrapper d=flex">
                    <span className="price-label price-old">
                        ${deal?.retailPrice}
                    </span>
                    <a target="_blank" rel="nofollow noopener external" className="price game-price">
                        <span className="price-inner game-price-new">
                            {salePrice}
                        </span>
                    </a>
                </div>
                <div className="os-labels-container relative">
                    <span className="discount label">-{Math.round(deal?.savings)}%</span>
                </div>
            </div>
            <div className="deal-cta">
                <a className="deal-cta-btn" target="_blank" rel="nofollow noopener external" href={`https://www.cheapshark.com/redirect?dealID=${deal?.dealID}`}>
                    <img src="/arrow.png" className="svg-icon"></img>
                </a>
            </div>
        </div>
    )
}