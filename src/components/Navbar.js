import {Link, Outlet} from "react-router-dom";
import React, {useState} from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import SubmitTicket from "./SubmitTicket";
import AddClient from "./AddClient";

function Navbar() {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
                <a className="navbar-brand p-1" href="#">Tickets Manager</a>
                <ul className="navbar-nav">
                    <li className="nav-item active">
                        <Link className="nav-link" to="/myap">Mes points d'accès</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" onClick={handleShow}>Soumettre un ticket</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/myTickets">Mes tickets</Link>
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
                <SubmitTicket/>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>


    );
}

export default Navbar;