import React, { useState, useEffect } from 'react';
import '../static/slider.css';
import '../static/calculator-component.css';

const GeneralCalculator = () => {
    const initialFormData = { DAE: 12.1, loanAmount: 10000, loanTerm: 100 };

    const [formData, setFormData] = useState(initialFormData);
    const [monthPayment, setMonthPayment] = useState(0);
    const [totalPayment, setTotalPayment] = useState(0);

    useEffect(() => {
        sendDataServer();
    }, [formData]);

    const sendDataServer = () => {
        fetch('http://localhost:8080/api/calculate/general', {
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

    const handleInputChange = (field, value) => {
        setFormData({ ...formData, [field]: value });
        console.log(formData)
    };

    return (
        <div className="general-calculator-container">
            <div className="input-container">

                <div className="input-item">
                    <label htmlFor="DAE">DAE</label>
                    <input
                        id="DAE"
                        type="number"
                        step={0.01}
                        max={100}
                        min={1}
                        value={formData.DAE}
                        onChange={e => handleInputChange('DAE', parseFloat(e.target.value))}
                    />
                </div>

                <div className="input-item">
                    <label htmlFor="loanAmount">Loan amount</label>
                    <input
                        id="loanAmount"
                        type="range"
                        min={100}
                        max={30000000}
                        value={formData.loanAmount}
                        onChange={e => handleInputChange('loanAmount', parseInt(e.target.value))}
                        className="slider"
                    />
                    <div className="slider-labels-small">
                        <span>from 100</span>
                        <span>up to 30000000</span>
                    </div>
                </div>

                <div className="input-item">
                    <label htmlFor="loanTerm">Loan term</label>
                    <input
                        id="loanTerm"
                        type="range"
                        min={6}
                        max={360}
                        value={formData.loanTerm}
                        onChange={e => handleInputChange('loanTerm', parseInt(e.target.value))}
                        className="slider"
                    />
                    <div className="slider-labels-small">
                        <span>from 6</span>
                        <span>up to 360</span>
                    </div>
                </div>
            </div>

            <div className="result-container">
                <h3>Total payment: {totalPayment}</h3>
                <h3>Month payment: {monthPayment}</h3>
            </div>
        </div>
    );

};

export default GeneralCalculator;
