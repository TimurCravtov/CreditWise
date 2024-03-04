import React, { useState, useEffect } from 'react';
import '../static/slider.css';
import '../static/calculator-component.css';

const Calculator = ({ offer }) => {
    console.log(offer)

    const [loanAmount, setLoanAmount] = useState(5000);
    const [loanTerm, setLoanTerm] = useState(12);
    const [activeCredit, setActiveCredit] = useState(offer.type);

    useEffect(() => {
        if (offer) {
            setActiveCredit(offer.type);
        }
    }, [offer]);

    useEffect(() => {
        sendDataToBackend();
    }, [loanAmount, loanTerm, offer.type]); // Include offer.loan_type in dependencies

    const handleLoanAmountChange = (e) => {
        setLoanAmount(parseInt(e.target.value));
        setActiveCredit(offer.type);
    };

    const handleLoanTermChange = (e) => {
        setLoanTerm(parseInt(e.target.value));
        setActiveCredit(offer.type);
    };

    const handleCreditChange = (credit) => {
        setActiveCredit(credit);
    };

    const sendDataToBackend = () => {
        const data = {
            loanAmount,
            loanTerm,
            activeCredit
        };

        fetch('http://localhost:8080/api/calculate', {
            method: 'POST',
            body: JSON.stringify(data)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log('Data sent successfully:', data);
            })
            .catch(error => {
                console.error('Error sending data to backend:', error);
            });
    };
    return (
        <div className="calculator-container">
            <div className="slider-containers">
                <div className="slider-container">
                    <label htmlFor="loanAmount">Loan amount(${loanAmount})</label>
                    <input
                        type="range"
                        min={offer.min_requested}
                        max={offer.max_requested}
                        value={loanAmount}
                        onChange={handleLoanAmountChange}
                        id="loanAmount"
                        className="slider"
                    />
                    <div className="slider-labels-small">
                        <span>from {offer.min_requested}</span>
                        <span>up to {offer.max_requested}</span>
                    </div>
                </div>

                <div className="slider-container">
                    <label htmlFor="loanTerm">Loan term {loanTerm} months)</label>
                    <input
                        type="range"
                        min={offer.min_term}
                        max={offer.max_term}
                        value={loanTerm}
                        onChange={handleLoanTermChange}
                        id="loanTerm"
                        className="slider"
                    />
                    <div className="slider-labels-small">
                        <span className='left'>from {offer.min_term} </span>
                        <span className='right'>up to {offer.max_term}</span>
                    </div>
                </div>
            </div>

            <div className="result-container">
                <h3>Total Payment (5)</h3>
            </div>
        </div>

    );
};

export default Calculator;
