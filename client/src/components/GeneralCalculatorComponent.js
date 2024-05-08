import React, { useState, useEffect } from 'react';
import '../static/slider.css';
import '../static/calculator-component.css';

const GeneralCalculator = (offer) => {

    // offer should contain fields required, term and DAE :: offer.term ect.

    const initialFormData = { DAE: 12.1, loanAmount: 10000, loanTerm: 100 };
    const [formData, setFormData] = useState(initialFormData);
    const [monthPayment, setMonthPayment] = useState(0);
    const [totalPayment, setTotalPayment] = useState(0);

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
                console.log(monthPayment, totalPayment);
            })
            .catch(error => {
                console.error('Error sending data:', error);
            });
    };

    const handleInputChange = (field, value) => {
        setFormData({ ...formData, [field]: value });
        sendDataServer();
    };

    return (
        <div>
            <input
                id="DAE"
                type="number"
                step={0.01}
                max={100}
                min={1}
                value={formData.DAE}
                onChange={e => handleInputChange('DAE', parseFloat(e.target.value))}
            />

            <div className="slider-container">
                <input
                    className="slider"
                    type="range"
                    min={100}
                    max={30000000}
                    value={formData.loanAmount}
                    defaultValue={1000}
                    onChange={e => handleInputChange('loanAmount', parseInt(e.target.value))}
                    id="loanAmount"
                />

                <input
                    className="slider"
                    type="range"
                    min={100}
                    max={360}
                    value={formData.loanTerm}
                    defaultValue={1000}
                    onChange={e => handleInputChange('loanTerm', parseInt(e.target.value))}
                    id="loanTerm"
                />
            </div>

            <div>
                Total payment: {totalPayment}
                Month payment: {monthPayment}
            </div>
        </div>
    );
};

export default GeneralCalculator;
