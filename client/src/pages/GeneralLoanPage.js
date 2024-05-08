import React, { useState, useEffect } from 'react';
import Calculator from '../components/CalculatorComponent'; // Импортируем компонент калькулятора
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useParams } from "react-router-dom";
import '../static/bank-page.css'
import calculatorComponent from "../components/CalculatorComponent";
import GeneralCalculatorComponent from "../components/GeneralCalculatorComponent";

const GeneralLoanPage = () => {
    return (
        <GeneralCalculatorComponent/>
    )
}

export default  GeneralLoanPage