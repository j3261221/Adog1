export default function MainSlider() {
  return (
    <section className="container slider">
      <div className="main-slider">
        <div id="main1">
          <div className="slider-gallery">
            <a className="slider-img">
              <img src="/main1.jpg" alt="" />
            </a>
            <div className="slider-content">
              <div className="slider-title">
                스팀 봄맞이 할인이 시작되었습니다
              </div>
              <div className="description">
                <div className="slider-price">
                  <span className="from"></span>
                  <span className="slider-price-inner"></span>
                </div>
                <a className="slider-more-btn" href="">
                  더 보기
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}