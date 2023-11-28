import AllClientsTable from "../components/AllClientsTable";
import AdminNavbar from "../components/AdminNavbar";

function Clients() {
    return (
        <>
            <AdminNavbar/>
            <h2 className='m-4'>Mes Clients</h2>
            <div className="row">
                <div className="col-md-2"></div>
                <div className="col-md-8"><AllClientsTable/></div>
                <div className="col-md-2"></div>
            </div>
        </>
    )
        ;
}

export default Clients;