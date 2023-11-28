import React, {useState} from 'react'
import {Link} from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import SubmitTicket from "./SubmitTicket";
import Button from "react-bootstrap/Button";
import AddClient from "./AddClient";



function AdminNavbar() {


    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
        <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
            <a className="navbar-brand p-1" href="#">Tickets Manager</a>
            <ul className="navbar-nav">
                <li className="nav-item active">
                    <Link className="nav-link" to="/clients">Clients</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/allTickets">Tickets</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" onClick={handleShow}>Add a Client </Link>
                </li>
                <li>
                    <Link className="nav-link" onClick={()=>{sessionStorage.clear()}} to="/">Logout</Link>
                </li>
            </ul>
        </nav>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <AddClient/>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default AdminNavbar;