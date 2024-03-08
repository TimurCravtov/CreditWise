import React, { useState, useEffect } from 'react';
import Calculator from '../components/CalculatorComponent'; // Импортируем компонент калькулятора
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useParams } from "react-router-dom";
import '../static/bank-page.css'
import calculatorComponent from "../components/CalculatorComponent";


const BankPage = () => {
    const { bankName } = useParams();
    const [bank, setBank] = useState(null);
    const [selectedOffer, setSelectedOffer] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchBank();
    }, [bankName]);

    const fetchBank = async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/bank/${bankName}`);
            if (!response.ok) {
                throw new Error('Failed to fetch bank');
            }
            const data = await response.json();
            setBank(data);
            if (data.offers && data.offers.length > 0) {
                setSelectedOffer(data.offers[0]); // Select the first offer by default
            }
        } catch (error) {
            console.error('Error fetching bank:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleOfferChange = (offer) => {
        setSelectedOffer(offer);
    };

    return (
        <div>
            <h2>Bank Page</h2>
            {loading ? (
                <p>Loading...</p>
            ) : bank ? (
                <div>
                    <div>
                        <p>Name: {bank.name}</p>
                        <p>ID: {bank.id}</p>
                        <img src={bank.logo_path} alt="Bank Logo" width={300}/>
                    </div>

                    <div className="border"> {/* Assuming 'border' is a variable for CSS class */}
                        <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
                            {bank.offers.map((offer, index) => (
                                <button
                                    key={index}
                                    className={`btn btn-lg px-4 custom-button ${selectedOffer === offer ? 'active' : ''}`}
                                    type="button"
                                    onClick={() => handleOfferChange(offer)}>
                                    {offer.type}
                                </button>
                            ))}
                        </div>
                        {selectedOffer && (
                            <Calculator bank = {bank} offer={selectedOffer}/>
                        )}
                    </div>
                </div>
            ) : (
                <p>Bank not found</p>
            )}
            <Link to="/banks">Back to Bank List</Link>
        </div>
    );

}

export default BankPage;
