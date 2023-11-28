import './App.css';
import Login from "./pagesClient/Login";
import {BrowserRouter, BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Error from "./pagesClient/Error";
import MyAp from "./pagesClient/MyAp";
import React from "react";
import MyTickets from "./pagesClient/MyTickets";
import HomeAdmin from "./pagesAdmin/HomeAdmin";
import Clients from "./pagesAdmin/Clients";
import AllTickets from "./pagesAdmin/AllTickets";


function App() {

    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Login/>}/>
                        <Route path="/myap" element={<MyAp/>}/>
                        <Route path="/profile" element={<MyAp/>}/>
                        <Route path="/dashboard" element={<HomeAdmin/>}/>
                        <Route path="/clients" element={<Clients/>}/>
                        <Route path="/allTickets" element={<AllTickets/>}/>
                        <Route path="/myTickets" element={<MyTickets/>}/>
                        <Route path="/*" element={<Error/>}/>
                </Routes>
            </BrowserRouter>
        </>
    );
}


export default App;
