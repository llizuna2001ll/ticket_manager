import axios from "axios";
import {useEffect, useState} from "react";
import error from "../pagesClient/Error";

function MyApTable() {
    const [posts, setPosts] =useState([])
    const url = 'http://localhost/ticketApi/retrievePa.php';
    useEffect(() => {
        let fData = new FormData();
        fData.append('idClient', sessionStorage.getItem('id'));
        axios.post(url, fData)
            .then(response => {
                sessionStorage.setItem('myPa',JSON.stringify(response.data));
                setPosts(response.data)
                     console.log(JSON.parse(sessionStorage.getItem('myPa')))
            })
            .catch(error => {
                console.log(error)
            })
    },[])

    return (

        <table className="table table-striped">
            <thead>
            <tr>
                <th className="col">#</th>
                <th className="col">Marque</th>
                <th className="col">Reférence</th>
                <th className="col">Emplacement</th>
                <th className="col">Date d'ajout</th>
                <th className="col">Statut</th>
            </tr>
            </thead>
            <tbody>
            {posts.map((mp, index) => (
                <tr>
                    <th scope="row">{index+1}</th>
                    <td>{mp.maqrue}</td>
                    <td >{mp.reference}</td>
                    <td>{mp.emplacement}</td>
                    <td>{mp.date_ajout}</td>
                    <td >{mp.status === 'WORKING' ? 'EN SERVICE' : 'HORS SERVICE'}</td>
                </tr>
            ))}
            </tbody>
        </table>
    );
}

export default MyApTable;