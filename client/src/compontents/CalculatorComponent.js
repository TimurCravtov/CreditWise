import React, { useState } from 'react';

const CreditCalculator = () => {
    const [loanAmount, setLoanAmount] = useState(0);
    const [interestRate, setInterestRate] = useState(0);
    const [loanTerm, setLoanTerm] = useState(0);
    const [monthlyPayment, setMonthlyPayment] = useState(0);

    const calculateMonthlyPayment = () => {
        const monthlyInterestRate = (interestRate / 100) / 12;
        const numPayments = loanTerm * 12;
        const monthlyPayment = (loanAmount * monthlyInterestRate) / (1 - Math.pow(1 + monthlyInterestRate, -numPayments));
        setMonthlyPayment(monthlyPayment.toFixed(2));
    };

    return (
        <div>
            <h2>Credit Calculator</h2>
            <div>
                <label htmlFor="loanAmount">Loan Amount ($): </label>
                <input type="number" id="loanAmount" value={loanAmount} onChange={(e) => setLoanAmount(parseFloat(e.target.value))} />
            </div>
            <div>
                <label htmlFor="interestRate">Interest Rate (%): </label>
                <input type="number" id="interestRate" value={interestRate} onChange={(e) => setInterestRate(parseFloat(e.target.value))} />
            </div>
            <div>
                <label htmlFor="loanTerm">Loan Term (years): </label>
                <input type="number" id="loanTerm" value={loanTerm} onChange={(e) => setLoanTerm(parseFloat(e.target.value))} />
            </div>
            <button onClick={calculateMonthlyPayment}>Calculate</button>
            {monthlyPayment > 0 && <p>Monthly Payment: ${monthlyPayment}</p>}
        </div>
    );
};

export default CreditCalculator;
