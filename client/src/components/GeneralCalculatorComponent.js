import React, { useState, useEffect } from 'react';
import '../static/slider.css';
import '../static/calculator-component.css';

const GeneralCalculator = (offer) => {

    // offer should contain fields required, term and DAE :: offer.term ect.

    const formData = {"DAE": 12.1, "loanAmount": 10000, "loanTerm": 100 }
    const [monthPayment, setMonthPayment] = useState(0)
    const [totalPayment, setTotalPayment] = useState(0)

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
                console.log(monthPayment, totalPayment)
            })
            .catch(error => {
                console.error('Error sending data:', error);
            });
    };

    return (<div>
            <input type={"number"} step = {0.01} max={100} min = {1} onChange={sendDataServer}/>
            <button onClick={sendDataServer}></button>
        </div>
    )
}

export default GeneralCalculator;