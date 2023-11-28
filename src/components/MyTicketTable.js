import React, {useEffect, useState} from "react";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import SubmitTicket from "./SubmitTicket";
import Button from "react-bootstrap/Button";

function MyTicketTable() {

    const detailStyle = {
        cursor: 'pointer',
        color: 'blue'
    }

    const [posts, setPosts] = useState([])
    const url = 'http://localhost/ticketApi/retrieveMyTickets.php';
    useEffect(() => {
        let fData = new FormData();
        fData.append('idClient', sessionStorage.getItem('id'));
        axios.post(url, fData)
            .then(response => {
                setPosts(response.data)
            })
            .catch(error => {
                console.log(error)
            })
    }, [])


    const [show, setShow] = useState(false);
    const [ticketNum, setTicketNum] = useState(false);
    const [detailIncident, setDetailIncident] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = (ticketnum, detailincident) => {
        setShow(true)
        setTicketNum(ticketnum)
        setDetailIncident(detailincident)
    }

    return (
        <>
            <table className="table table-striped">
                <thead>
                <tr>
                    <th className="col">#</th>
                    <th className="col">Signale Par</th>
                    <th className="col">Emplacement</th>
                    <th className="col">Date de signalisation</th>
                    <th className="col">Date de cloture</th>
                    <th className="col">Statut</th>
                    <th className="col"></th>
                </tr>
                </thead>
                <tbody>
                {posts.map((tk, index) => (
                    <tr>
                        <th scope="row">{index + 1}</th>
                        <td>{tk.signale_par}</td>
                        <td>{tk.emplacement}</td>
                        <td>{tk.date_signalisation}</td>
                        <td>{tk.date_clot === null ? 'PAS ENCORE' : tk.date_clot}</td>
                        <td>{tk.status}</td>
                        <td style={detailStyle} onClick={()=> {handleShow(index+1,tk.detail_incident)}}>more details</td>
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
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default MyTicketTable;