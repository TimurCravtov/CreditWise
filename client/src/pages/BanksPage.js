import React, { useState, useEffect } from 'react';
import Calculator from '../components/CalculatorComponent';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useParams } from "react-router-dom";
import '../static/bank-page.css'
import calculatorComponent from "../components/CalculatorComponent";
import BankList from "../components/BankListComponent";

const BanksPage = () => {
    return (<BankList/>)
}

export default BanksPage