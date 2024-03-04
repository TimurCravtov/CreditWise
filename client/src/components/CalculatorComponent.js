import React, { useState, useEffect } from 'react';
import '../static/slider.css';
import '../static/calculator-component.css'

const Calculator = ({ offer }) => {
    const [loanAmount, setLoanAmount] = useState(5000);
    const [loanTerm, setLoanTerm] = useState(12);
    const [interestRate, setInterestRate] = useState(5);
    const [activeCredit, setActiveCredit] = useState(null);

    useEffect(() => {
        if (offer) {
            setActiveCredit(offer.loan_type);
            setInterestRate(offer.DAE);
        }
    }, [offer]);

    const handleLoanAmountChange = (e) => {
        setLoanAmount(parseInt(e.target.value));
    };

    const handleLoanTermChange = (e) => {
        setLoanTerm(parseInt(e.target.value));
    };

    const handleInterestRateChange = (e) => {
        setInterestRate(parseInt(e.target.value));
    };

    const handleCreditChange = (credit) => {
        setActiveCredit(credit);
    };

    const calculateTotalPayment = () => {
        if (activeCredit) {
            const monthlyInterestRate = interestRate / 100 / 12;
            const totalPayments = loanAmount * (monthlyInterestRate / (1 - Math.pow(1 + monthlyInterestRate, -loanTerm)));
            return totalPayments.toFixed(2);
        }
        return 0;
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
                <h3>Total Payment ${calculateTotalPayment()}</h3>
            </div>
        </div>

    );
};

export default Calculator;
