import AdminNavbar from "../components/AdminNavbar";
import AllTicketsTable from "../components/AllTicketsTable";
import MyApTable from "../components/MyApTable";

function AllTickets() {
    return (
        <>
            <AdminNavbar/>
            <h2 className='m-4'>Tous les tickets</h2>
            <div className="row">
                <div className="col-md-2"></div>
                <div className="col-md-8"><AllTicketsTable/></div>
                <div className="col-md-2"></div>
            </div>
        </>
    );
}

export default AllTickets;