import React, { useState, useEffect } from 'react';
import '../static/slider.css';
import '../static/calculator-component.css';

const Calculator = ({ offer, bank }) => {
    const [formData, setFormData] = useState({
        loanAmount: 5000,
        loanTerm: 12,
        activeCredit: offer.type,
        bankId: bank.id // Send bank ID directly from the props
    });

    const [totalPayment, setTotalPayment] = useState(0);
    const [monthPayment, setMonthPayment] = useState(0);

    useEffect(() => {
        if (offer) {
            setFormData(prevState => ({
                ...prevState,
                activeCredit: offer.type,
                loanAmount: Math.floor(offer.max_requested * 6 / 10),
                loanTerm: Math.floor(offer.max_term * 3 / 10)
            }));
        }
    }, [offer]);

    useEffect(() => {
        sendDataToBackend();
    }, [formData]);

    const handleInputChange = (field, value) => {
        setFormData(prevState => ({
            ...prevState,
            [field]: value
        }));
    };

    const sendDataToBackend = () => {
        fetch('http://localhost:8080/api/calculate', {
            method: 'POST',
            body: JSON.stringify(formData)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setTotalPayment(data.totalPayment);
                setMonthPayment(data.monthPayment);
            })
            .catch(error => {
                console.error('Error sending data:', error);
            });
    };

    const DAE_printer = () =>
    {
        return offer.floating_percent == 1? <h3 className="dae">Dae = {offer.DAE}%* </h3> : <h3 className="dae"> Dae = {offer.DAE}% </h3>
    }
    return (
        <div className="calculator-container">
            <div className="slider-containers">
                <div className="slider-container">
                    <label htmlFor="loanAmount">Loan amount({formData.loanAmount} Lei)</label>
                    <input
                        type="range"
                        min={offer.min_requested}
                        max={offer.max_requested}
                        value={formData.loanAmount}
                        onChange={e => handleInputChange('loanAmount', parseInt(e.target.value))}
                        id="loanAmount"
                        className="slider"
                    />
                    <div className="slider-labels-small">
                        <span>from {offer.min_requested}</span>
                        <span>up to {offer.max_requested}</span>
                    </div>
                </div>

                <div className="slider-container">
                    <label htmlFor="loanTerm">Loan term {formData.loanTerm} months)</label>
                    <input
                        type="range"
                        min={offer.min_term}
                        max={offer.max_term}
                        value={formData.loanTerm}
                        onChange={e => handleInputChange('loanTerm', parseInt(e.target.value))}
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
                <DAE_printer/>
                <h3>Total Payment: {Math.round(totalPayment*100)/100}</h3>
                <h3>Monthly Payment: {Math.round(monthPayment*100)/100}</h3>
                {offer?.floating_percent === 1 && <h3>*floating percent</h3>}
            </div>
        </div>
    );
};

export default Calculator;
