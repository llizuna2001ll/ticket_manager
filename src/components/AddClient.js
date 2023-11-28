import Modal from "react-bootstrap/Modal";
import React, {useState} from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";




function AddClient() {

    const [nom, setNom] = useState("");
    const [nomError, setNomError] = useState("");
    const [password, setPassword] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState("");
    const [submitError, setSubmitError] = useState("");
    const [tel, setTel] = useState("");
    const [telError, setTelError] = useState("");

    function handleAddClient() {
        if(nom.length !== 0 && email.length !== 0 && password.length !== 0 && tel.length !== 0){
            setSubmitError("");
            const url = 'http://localhost/ticketApi/addClient.php';
            let fData = new FormData();
            fData.append('nom', nom);
            fData.append('email', email);
            fData.append('password', password);
            fData.append('tel', tel);
            axios.post(url, fData)
                .then(response => {
                    setSubmitError(response.data);
                    setNom("");
                    setPassword("");
                    setTel("");
                    setEmail("");
                })
                .catch(error => setSubmitError(error));
        }
        else setSubmitError("Fill In all fields");
    }

    return(
        <>
        <Modal.Header closeButton>
            <Modal.Title>Submit a ticket</Modal.Title>
        </Modal.Header>
    <Modal.Body>
        <Form>
            <label className="mb-1" htmlFor="nom">Nom</label>
            <Form.Group className="mb-1" controlId="nom" value={nom}
                        onChange={(e) => setNom(e.target.value)}>
                <Form.Control type="text" placeholder="Nom" />
            </Form.Group>
            <p className="mb-3 text-danger">{nomError}</p>

            <label className="mb-1" htmlFor="password">Password</label>
            <Form.Group className="mb-1" controlId="password" value={password}
                        onChange={(e) => setPassword(e.target.value)}>
                <Form.Control type="password" placeholder="Password" />
            </Form.Group>
            <p className="mb-3 text-danger">{passwordError}</p>

            <label className="mb-1" htmlFor="email">Email</label>
            <Form.Group className="mb-1" controlId="email" value={email}
                        onChange={(e) => setEmail(e.target.value)}>
                <Form.Control type="email" placeholder="Email"/>
            </Form.Group>
            <p className="mb-3 text-danger">{emailError}</p>

            <label className="mb-1" htmlFor="tel">Télephone</label>
            <Form.Group className="mb-1" controlId="tel" value={email}
                        onChange={(e) => setTel(e.target.value)}>
                <Form.Control type="texte" placeholder="tel"/>
            </Form.Group>
            <p className="mb-3 text-danger">{emailError}</p>

            <Button className="btn btn bg-success text-white" type='button' value='submitLogin'
                    name='submitTicket' onClick={handleAddClient}>
                Ajouter Client
            </Button>
        <div className='text-center'>
            <p className="mb-3">{submitError}</p>
        </div>

        </Form>
        </Modal.Body>
        </>
    );
}

export default AddClient;