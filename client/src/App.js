import React from 'react';
import './App.css';
import HeaderComponent from "./components/HeaderComponent";
import BankList from "./components/BankListComponent";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CalculatorComponent from "./components/CalculatorComponent";
import BankPage from "./pages/BankPage";
import BanksPage from "./pages/BanksPage";
import './static/global.css'
import HomePage from "./pages/HomePage";
const App = () => {
    return (
        <BrowserRouter>
            <div>
                <HeaderComponent />
                <Routes>
                    <Route path="/" element={<HomePage/>} />
                    <Route path="/banks" element={<BanksPage/>} />
                    <Route path="/bank/:bankName" element={<BankPage/>} />
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
