import DetailGameBox from "@/app/component/detailGameBox";
import Modal from "@/app/component/modal";
import axios from "axios";



export default async function GameDetailPage(props) {
  const dealID = props.params.dealID;
  let game;
  let gameID;
  let gameInfo;
  let storeList;

  await axios.get(`https://www.cheapshark.com/api/1.0/deals?id=${dealID}`)
    .then(res => {
      gameInfo = res.data.gameInfo;
      gameID = gameInfo.gameID;
    })
  await axios.get(`https://www.cheapshark.com/api/1.0/games?id=${gameID}`)
    .then(res => {
      game = res.data;

    })

  await axios.get(`https://www.cheapshark.com/api/1.0/stores`)
    .then(res => {
      storeList = res.data;
    })
  const metascore = gameInfo?.metacriticScore;

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

  return (
    <Modal>
      <div className="modal-content-wrap">
        <div className="modal-content">
          <h1 style={{ margin: "12px" }}>{gameInfo.name}</h1>
          <div className="modal-content-wrap d-flex flex-row">
            <div className="col-left">
              <div className="gameBox d-flex flex-justify-center flex-align-center" style={{ marginBottom: "12px", marginTop: "0", height:"60px"}}>
                <a className="d-flex flex-align-center steam-logo flex-justify-center relative" target="_blank" rel="nofollow noopener external" href="">
                  <img className="shop-logo" src={`https://www.cheapshark.com/img/stores/banners/0.png`} style={{maxHeight:"50px", maxWidth: "130px"}}/>
                </a>
                <a className="steam-link" target="_blank" rel="nofollow noopener external" href={`https://store.steampowered.com/app/${gameInfo?.steamAppID}/`}>스팀 페이지 바로가기</a>
              </div>
              <div className="offer-section">
                <div className="shadow-box-big-light">
                  {game.deals.slice(0, 7).map((deal) =>
                    <DetailGameBox key={deal.dealID} deal={deal} storeList={storeList} store={Number(deal.storeID) - 1} />
                  )}
                </div>
              </div>
            </div>
            <div className="col-right relative with-pagination">
              <div className="game-info-widget shadow-box-small-lighter relative">
                <div className="game-info-content relative">
                  <div className="os-content ">
                    <div className="game-info-details d-flex flex-column">
                      <div className="game-info-details-section d-flex flex-justify-eachend" style={{ margin: '24px 30px 0px 15px' }}>
                        <h4 className="game-info-inner-heading">역대 최저</h4>
                        <p className="game-info-details-content">
                          {game?.cheapestPriceEver?.price == "0.00" ? "Free" : "$" + game?.cheapestPriceEver?.price}
                        </p>
                        <h4 className="game-info-inner-heading">현재 최저</h4>
                        <p className="game-info-details-content">
                          {game?.deals[0]?.price == "0.00" ? "Free" : "$" + game?.deals[0]?.price}
                        </p>
                      </div>
                      <div className="game-info-details-section" style={{ margin: "24px 30px 0px 15px" }}>
                        <h4 className="game-info-inner-heading">평점</h4>
                        <div className="game-info-details-content">
                          <div className="score d-flex flex-wrap flex-align-center">
                            <div className="score-col d-flex flex-align-center flex-nowrap">
                              <a target="_blank" rel="nofollow noopener external" href={`www.metacritic.com${gameInfo?.metacriticLink}`}>
                                <span class={"large no-margin game-score-meta-value game-score-square " + metacolor}>
                                  {metascore}
                                </span>
                              </a>
                              <div className="score-label d-flex flex-align-center" style={{ marginLeft: "10px" }}>메타스코어</div>
                            </div>
                          </div>
                          <div className="score full d-flex flex-wrap flex-align-center">
                            <div className="score-col full d-flex flex-align-center flex-wrap">
                              <div className="score-heading d-flex flex-nowrap">
                                <div className="score-label d-flex flex-align-center">
                                  스팀평점
                                </div>
                                <a className="score-grade" target="_blank" rel="nofollow noopener external" href={`https://store.steampowered.com/app/${gameInfo?.steamAppID}/`}>
                                  <span className="reviews-label" title={"일단 띄워봐"}>
                                    Very Positive
                                    <span>
                                      (111,433)
                                    </span>
                                  </span>
                                </a>
                              </div>
                              <span className="score-bar">
                                <span className="progress-bar" style={{ width: gameInfo?.steamRatingPercent }}>
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
            </div>
          </div>
        </div>
      </div>
    </Modal >
  )
}