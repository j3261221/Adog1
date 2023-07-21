import Navbar from "../component/navbar";
import TopMenu from "../component/topmenu";
import "../../styles/annonce.scss"

export default function News() {
    return (
        <div className="background">
            <TopMenu />
            <Navbar />
            <div className="main-content">
                <div className="page relative">
                    <div className="news container">
                        <div className="news-section relative flex-nowrap d-flex flex-wrap flex-column flex-justify-center">
                            <div className="d-flex flex-wrap relative news-list">
                                <article className="d-flex flex-nowrap relative news-list-item flex-row" >
                                    <a className="full-link" href="/news/[newsID]"></a>
                                    <div className="news-image-wrapper">
                                        <img src="/slider1.jpg" sizes="(min-width: 1030px) 352px, 108px" height="184" width="352"></img>
                                    </div>
                                    <div className="news-info-wrapper d-flex flex-row flex-wrap relative">
                                        <div className="news-title-wrapper">
                                            <h3 className="news-title">
                                                <a href="">FREE Ancient Enemy on GOG for a limited time!</a>
                                            </h3>
                                            <div className="news-lead">
                                                Expand your library with this RPG card battler.
                                            </div>
                                        </div>
                                    </div>
                                    <div className="news-read-more d-flex flex-row">
                                        <a className="widget-link-more">
                                            더 보기
                                            <div className="next" />
                                        </a>
                                    </div>
                                </article>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
