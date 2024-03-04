import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router, Routes, Route, Link, useNavigate} from 'react-router-dom';
import '../static/bank-page.css'

const BankList = () => {
    const [banks, setBanks] = useState([]);

    useEffect(() => {
        fetchBanks();
    }, []);

    const navigate = useNavigate();

    const routeChange = (bank_name) =>{
        let path = `/bank/${bank_name}`;
        navigate(path);
    }

    const fetchBanks = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/banks');
            const data = await response.json();
            setBanks(data.banks);
        } catch (error) {
            console.error('Error fetching banks:', error);
        }
    };

    return (
        <div style={{maxWidth:"100%", paddingLeft: "10px"}}>
            <h1 align="center">Bank list</h1>
            <div className="row" >
                {banks.map((bank, index) => (
                    <div key={index} className="col-md-4 mb-4">
                        <div className="card">
                            <img src={bank.logo_path} className="card-img-top" alt={bank.name} style={{ maxWidth: '40%', maxHeight: '40%', margin: 'auto', padding:'20px'}} />
                            <div className="card-body">
                                <h2 className="card-title">{bank.name}</h2>
                                <div className="d-flex justify-content-between align-items-center">
                                    <div className="btn-group">
                                        {/* Instead of Router, use a Link */}
                                        <Link to={`/bank/${bank.name}`} className="btn btn-sm btn-outline-secondary">View</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

};

export default BankList
