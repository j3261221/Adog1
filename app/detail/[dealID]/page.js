import Modal from "@/app/component/modal";

export default function GameDetailPage() {
    
    return (
        <Modal>
            <div className="modal-content-wrap">
                <div className="modal-content">
                    <h1>title</h1>

                    <div className="offer-section">
                        <div className="shadow-box-big-light">
                            <div className="relative gameBox d-flex flex-wrap flex-align-center game-item flex-nowrap">
                                <a className="full-link" target="_blank" rel="nofollow noopener external" href=""></a>
                                <div className="d-flex flex-align-center flex-self-start shop-image">
                                    <a className="d-flex flex-align-center shop-link flex-justify-center" target="_blank" rel="nofollow noopener external" href="">
                                        {/* <img className="shop-logo" src={`https://www.cheapshark.com/img/stores/banners/${Number(list.storeID) - 1}.png`} /> */}
                                    </a>
                                </div>
                                <div className="game-info-wrapper grid relative">
                                    <div className="game-info-title-wrapper d-flex flex-row flex-nowrap ">
                                        <a className="game-info-title title" href="" target="_blank">
                                            Subnautica
                                        </a>
                                    </div>
                                    <div className="game-tags game-tags-deal">
                                        <div className="d-flex flex-align-center tags d-flex flex-row flex-nowrap">
                                            <div className="time-tag tag d-flex flex-row flex-nowrap">
                                                {/* {howLongAgo} */}
                                                1days
                                            </div>
                                        </div>
                                    </div>
                                    <div className="relative price-info-with-label d-flex">
                                        <div className="price-wrapper with-badges d-flex flex-row">
                                            <span className="price-label price-old relative">
                                                $29.99
                                            </span>
                                            <a target="_blank" rel="nofollow noopener external" class="price game-price" href="">
                                                <span className="price-inner game-price-current">
                                                    $7.49
                                                </span>
                                            </a>
                                        </div>
                                    </div>
                                    <div target="_blank" rel="nofollow noopener external" class="d-flex flex-row flex-justify-end flex-nowrap labels-container">
                                        <span className="discount label">
                                            -75%
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Modal >
    )
}