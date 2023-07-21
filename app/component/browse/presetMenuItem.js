import Link from "next/link";

export default function PresetMenuItem(props) {
    return (
        <div id="preset-menu" className="flex preset-menu">
            <div className="menu-item">
                <span>
                    <Link className="menu-item-link" href={props.link}>{props.name}</Link>
                </span>
            </div>
        </div>
    )
}