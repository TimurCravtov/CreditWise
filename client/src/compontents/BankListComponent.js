import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const BankList = () => {
    const [banks, setBanks] = useState([]);

    useEffect(() => {
        fetchBanks();
    }, []);

    const fetchBanks = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/banks');
            const data = await response.json();
            setBanks(data.banks); // Обращаемся к массиву банков в объекте data
        } catch (error) {
            console.error('Error fetching banks:', error);
        }
    };

    return (
        <div>
            <h1>Bank list</h1>
            <div className="row">
                {banks.map((bank, index) => (
                    <div key={index} className="col-md-4 mb-4">
                        <div className="card">
                            <img src={bank.logo_path} className="card-img-top" alt={bank.name} style={{ width: '100px', height: '100px', margin: 'auto' }} />
                            <div className="card-body">
                                <h2 className="card-title">{bank.name}</h2>
                                <div className="d-flex justify-content-between align-items-center">
                                    <div className="btn-group">
                                        <Link to={`/bank/${name}`} className="btn btn-sm btn-outline-secondary">View</Link>                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

};

export default BankList;
