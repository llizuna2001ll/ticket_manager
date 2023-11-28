import React, {useEffect, useState} from "react";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function AllClientsTable() {

    const detailStyle = {
        cursor: 'pointer',
        color: 'blue'
    }

    const [marque, setMarque] =useState([])
    const [marqueError, setMarqueError] =useState([])
    const [emplacement, setEmplacement] =useState([])
    const [emplacementError, setEmplacementError] =useState([])
    const [reference, setReference] =useState([])
    const [referenceError, setReferenceError] =useState([])
    const [submitError, setSubmitError] =useState([])

    function handleAddAp() {
        console.log(ticketNum)
        if(marque.length !== 0 && emplacement.length !== 0 && reference.length !== 0){
            setSubmitError("");
            const url = 'http://localhost/ticketApi/addPa.php';
            let fData = new FormData();
            fData.append('marque', marque);
            fData.append('emplacement', emplacement);
            fData.append('reference', reference);
            fData.append('idClient', ticketNum);
            axios.post(url, fData)
                .then(response => {
                    setSubmitError(response.data);
                    setMarque("");
                    setReference("");
                    setEmplacement("");
                })
                .catch(error => setSubmitError(error));
        }
        else setSubmitError("Fill In all fields");
    }

    const [posts, setPosts] =useState([])
    const url = 'http://localhost/ticketApi/allClients.php';
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
    const [detailIncident, setDetailIncident] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = (ticketnum, detailincident) => {
        setShow(true)
        setTicketNum(ticketnum)
        setDetailIncident(detailincident)
    }
    return (
        <>
        <table className="table table-striped text-center">
            <thead>
            <tr>
                <th className="col">#</th>
                <th className="col">Nom Client</th>
                <th className="col">Email</th>
                <th className="col">Téléphone</th>
                <th className="col ">Nombre de point d'accés</th>


            </tr>
            </thead>
            <tbody>
            {posts.map((mp, index) => (
                <tr>
                    <th scope="row">{index+1}</th>
                    <td>{mp.nom}</td>
                    <td >{mp.email}</td>
                    <td>{mp.tel}</td>
                    <td>{mp.nbPa}</td>
                    <th style={detailStyle} className="col " onClick={()=> {handleShow(index+1,mp.id)}}>ajouter un point d'accés</th>
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
                    <Modal.Title>Ajouter un point d'accés</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <label className="mb-1" htmlFor="marque">Marque</label>
                        <Form.Group className="mb-1" controlId="marque" value={marque}
                                    onChange={(e) => setMarque(e.target.value)}>
                            <Form.Control type="text" placeholder="Marque" />
                        </Form.Group>
                        <p className="mb-3 text-danger">{marqueError}</p>

                        <label className="mb-1" htmlFor="emplacement">Emplacement</label>
                        <Form.Group className="mb-1" controlId="emplacement" value={emplacement}
                                    onChange={(e) => setEmplacement(e.target.value)}>
                            <Form.Control type="text" placeholder="Emplacement" />
                        </Form.Group>
                        <p className="mb-3 text-danger">{emplacementError}</p>

                        <label className="mb-1" htmlFor="reference">Reference</label>
                        <Form.Group className="mb-1" controlId="reference" value={reference}
                                    onChange={(e) => setReference(e.target.value)}>
                            <Form.Control type="text" placeholder="Reference" />
                        </Form.Group>
                        <p className="mb-3 text-danger">{referenceError}</p>

                        <Button className="btn btn bg-success text-white" type='button'
                                name='submitTicket' onClick={handleAddAp}>
                            Ajouter Point D'accés
                        </Button>
                        <div className='text-center'>
                            <p className="mb-3">{submitError}</p>
                        </div>
                    </Form>
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

export default AllClientsTable;