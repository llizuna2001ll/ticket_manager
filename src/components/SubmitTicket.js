import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import React, {useState} from "react";
import Button from "react-bootstrap/Button";
import {FormControl} from "react-bootstrap";
import axios from 'axios';
function SubmitTicket() {

    const [signalePar, setSignalePar] = useState("");
    const [signaleParError, setSignaleParError] = useState("");
    const [accessPoint, setAccessPoint] = useState("");
    const [accessPointError, setAccessPointError] = useState("");
    const [detailIncident, setDetailIncident] = useState("");
    const [detailIncidentError, setDetailIncidentError] = useState("");
    const [submitError, setSubmitError] = useState("");

    let accessPoints = JSON.parse(sessionStorage.getItem('myPa'));
    function handleSubmitTicket() {
        if( signalePar.length !== 0 && detailIncident.length !== 0 && accessPoint !== "Choisir le point d'accés hors-service" ){
            setSubmitError("")
            const url = 'http://localhost/ticketApi/submitTicket.php';
            let fData = new FormData();
            fData.append('idPa', accessPoint);
            fData.append('detailIncident', detailIncident);
            fData.append('signalePar', signalePar);
            axios.post(url, fData)
                .then(response => {
                    setSubmitError("Ticket envoyé avec succés")
                    setSignalePar("")
                    setAccessPoint("Choisir le point d'accés hors-service")
                    setDetailIncident("")
                })
                .catch(error => setSubmitError(error));
        }
        else setSubmitError("Fill In all fields");
    }

    return (
        <>
            <Modal.Header closeButton>
                <Modal.Title>Submit a ticket</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <label className="mb-1" htmlFor="signalePar">Signalé par</label>
                    <Form.Group className="mb-1" controlId="signalePar" value={signalePar}
                                                onChange={(e) => setSignalePar(e.target.value)}>
                        <Form.Control type="text" placeholder="Signalé Par" />
                    </Form.Group>
                    <p className="mb-5 text-danger">{signaleParError}</p>

                    <label className="mb-1" htmlFor="accessPoint">Point d'accés</label>
                    <Form.Group className="mb-1" controlId="accessPoint" value={accessPoint}
                                onChange={(e) => setAccessPoint(e.target.value)}>
                        <Form.Select>
                            <option>Choisir le point d'accés hors-service</option>
                            {accessPoints.map((ap, index) => (
                                <option key={ap.id} value={ap.id}>{index+1}-{ap.maqrue} {ap.reference} --&nbsp;&nbsp;{ap.emplacement}</option>
                            ))}
                        </Form.Select>

                    </Form.Group>
                    <p className="mb-5 text-danger">{accessPointError}</p>

                    <label className="mb-1" htmlFor="detailIncident">Detail de l'incident</label>
                    <Form.Group className="mb-1" controlId="detailIncident" value={detailIncident}
                                onChange={(e) => setDetailIncident(e.target.value)}>
                       <FormControl as="textarea" rows="3" placeholder="Detail de l'incident"/>
                    </Form.Group>
                    <p className="mb-5 text-danger">{detailIncidentError}</p>
                    <div className="d-grid gap-2 col-6 mx-auto mb-3">


                    <Button className="btn btn bg-success text-white" type='button' value='submitLogin'
                            name='submitTicket' onClick={handleSubmitTicket}>
                        Submit Ticket
                    </Button>
                    </div>
                    <div className='text-center'>
                        <p className="mb-3">{submitError}</p>
                    </div>
                </Form>
            </Modal.Body>
        </>
    );
}

export default SubmitTicket;