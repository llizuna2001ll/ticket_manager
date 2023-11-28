import React, {useEffect, useState} from "react";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

function AllTicketsTable() {



    const detailStyle = {
        cursor: 'pointer',
        color: 'blue'
    }

    const [posts, setPosts] =useState([])
    const url = 'http://localhost/ticketApi/allTickets.php';
    useEffect(() => {
        let fData = new FormData();
        axios.post(url, fData)
            .then(response => {
                setPosts(response.data)
                console.log(response.data)
            })
            .catch(error => {
                console.log(error)
            })
    },[])

    const [show, setShow] = useState(false);
    const [ticketNum, setTicketNum] = useState(false);
    const [dateClot, setDateClot] = useState(false);
    const [detailIncident, setDetailIncident] = useState(false);
    const [idPa, setIdPa] = useState(false);
    const [ticketId, setTicketId] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = (ticketnum, detailincident,dateClot,idPa,ticketId) => {
        setShow(true)
        setTicketNum(ticketnum);
        setDetailIncident(detailincident);
        setIdPa(idPa)
        if(dateClot === '') setDateClot(dateClot);
        else setDateClot('PAS ENCORE TRAITE');
        setTicketId(ticketId);
    }

    const handleSendToBackOffice = () =>{
        const url = 'http://localhost/ticketApi/sendToBack.php';
        let fData = new FormData();
        fData.append('idTicket', ticketId);
        fData.append('idPa', idPa);
        axios.post(url, fData)
            .then(response => { console.log(response.data)
            }).catch(error => console.log(error.data));
    }


    return(
        <>
        <table className="table table-striped text-center">
            <thead>
            <tr>
                <th className="col">#</th>
                <th className="col">Etablissement</th>
                <th className="col">Emplacement</th>
                <th className="col">Sigalé Par</th>
                <th className="col ">Date de signalisation</th>
            </tr>
            </thead>
            <tbody>
            {posts.map((mp, index) => (
                <tr>
                    <th scope="row">{mp.id}</th>
                    <td>{mp.nom}</td>
                    <td >{mp.emplacement}</td>
                    <td>{mp.signale_par}</td>
                    <td onClick={()=> {handleShow(index+1,mp.detail_incident)}}>{mp.date_signalisation}</td>
                    <td style={detailStyle} onClick={()=> {handleShow(index+1,mp.detail_incident,mp.date_clot,mp.idPa,mp.id)}}>more details</td>
                </tr>
            ))}
            </tbody>

        </table>
    <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
    >
        <Modal.Header closeButton>
            <Modal.Title>Mon ticket {ticketNum}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <h5>Detail de l'incident</h5>
            <p>{detailIncident}</p>
            <h5>Date de cloture</h5>
            <p>{dateClot}</p>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="success" onClick={handleSendToBackOffice}>
                Envoyer au back office
            </Button>

            <Button variant="danger" onClick={handleClose}>
                Close
            </Button>
        </Modal.Footer>
    </Modal>
    </>
    );
}

export default AllTicketsTable;