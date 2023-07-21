import AdminNav from "./adminNav";
import "../../styles/globals.scss";

const Layout = (props) => {

    return (
        <html lang="en">
            <body className="bg-darkest">
                <AdminNav />
                {props.children}
            </body>
        </html >
    );
}

export default Layout;