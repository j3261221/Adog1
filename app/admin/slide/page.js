import { connectDB } from "@/util/database"
import Link from "next/link";
import "../../../styles/admin.scss"

export default async function List() {
    let db = (await connectDB).db('adog');
    let result = await db.collection('slide').find().toArray();

    return (
        <div className="main-content">
            <div className="page relative">
                <div className="admin container">
                    <div className="admin-section relative flex-nowrap d-flex flex-wrap flex-column flex-justify-center">
                        <div className="d-flex flex-wrap relative admin-list">
                        <a href="slide/write" className="new-slide">새 슬라이드</a>
                            {result.map((a, i) =>
                                <div className="d-flex flex-nowrap relative admin-list-item flex-row" key={i}>
                                    {/* <a className="full-link" href="/admin/[adminID]"></a> */}
                                    <div className="admin-image-wrapper">
                                        <img src={result[i].eachSlide} height="184" width="352"></img>
                                    </div>
                                    <div className="admin-info-wrapper d-flex flex-row flex-wrap relative">
                                        <div className="admin-title-wrapper">
                                            <h3 className="admin-title">
                                                <a href="">{result[i].title}</a>
                                            </h3>
                                            <div className="admin-lead">
                                                {result[i].price}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="admin-read-more d-flex flex-row">
                                        <a className="widget-link-more">
                                            삭제
                                        </a>
                                    </div>
                                </div>

                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}