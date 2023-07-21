export default function DetailGameBox(props) {
    const { store, deal, storeList } = props;

    return (
        <div className="relative gameBox d-flex flex-wrap flex-align-center game-item flex-nowrap">
            <a className="full-link" target="_blank" rel="nofollow noopener external" href=""></a>
            <div className="d-flex flex-align-center flex-self-start shop-image">
                <a className="d-flex flex-align-center shop-link flex-justify-center relative" target="_blank" rel="nofollow noopener external" href="">
                    <img className="shop-logo" src={`https://www.cheapshark.com/img/stores/banners/${store}.png`} />
                </a>
            </div>
            <div className="game-info-wrapper grid relative">
                <div className="game-info-title-wrapper d-flex flex-row flex-nowrap ">
                    <a className="game-info-title title" href="" target="_blank">
                        {storeList[store].storeName}
                    </a>
                </div>
                <div className="relative price-info-with-label d-flex">
                    <div className="price-wrapper with-badges d-flex flex-row">
                        <span className="price-label price-old relative">
                            ${deal.retailPrice}
                        </span>
                        <a target="_blank" rel="nofollow noopener external" class="price game-price" href="">
                            <span className="price-inner game-price-current">
                                {deal.price == "0.00" ? "Free" : "$" + deal.price}
                            </span>
                        </a>
                    </div>
                </div>
                <div target="_blank" rel="nofollow noopener external" class="d-flex flex-row flex-justify-end flex-nowrap labels-container">
                    <span className="discount label">
                        {Math.round(deal.savings)}%
                    </span>
                </div>
            </div>
        </div>
    )
}