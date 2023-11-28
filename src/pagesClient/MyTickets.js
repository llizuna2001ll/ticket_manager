import Navbar from "../components/Navbar";
import MyTicketTable from "../components/MyTicketTable";


function MyTickets() {
    return (
        <>
            <Navbar/>
            <h2 className='m-4'>Mes Tickets</h2>
            <div className="row">
                <div className="col-md-2"></div>
                <div className="col-md-8"><MyTicketTable/></div>
                <div className="col-md-2"></div>
            </div>
        </>
    );
}

export default MyTickets;