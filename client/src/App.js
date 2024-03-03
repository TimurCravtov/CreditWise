import React from 'react';
import './App.css';
import HeaderComponent from "./components/HeaderComponent";
import BankList from "./components/BankListComponent";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CalculatorComponent from "./components/CalculatorComponent";
import RequestedLoanSelector from "./components/RequestedLoanSelector";
import BankPage from "./pages/BankPage";

const App = () => {
    return (
        <BrowserRouter>
            <div>
                <HeaderComponent />
                <Routes>
                    <Route path="/" element={<BankList/>} />
                    <Route path="/bank/:bankName" element={<BankPage/>} />
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
