import Navbar from "../components/Navbar";
import MyApTable from "../components/MyApTable";

function MyAp() {
    return (
        <div>
            <Navbar/>
            <h2 className='m-4'>Mes points d'accès</h2>
            <div className="row">
                <div className="col-md-2"></div>
                <div className="col-md-8"><MyApTable/></div>
                <div className="col-md-2"></div>
            </div>


        </div>
    );
}

export default MyAp;