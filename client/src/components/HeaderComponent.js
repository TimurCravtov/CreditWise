import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import creditwise_logo from '../static/creditwise_logo.png'

function Header() {
    return (
        <header className="d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom">
        <a href="/"
           className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none">
            <img src={creditwise_logo} width="40" height="32" alt = "logo"/>
            <use href="#bootstrap"></use>
            <span className="fs-4">CreditWise</span>
        </a>

        <ul className="nav nav-pills">
            <li className="nav-item"><a href="#" className="nav-link active" aria-current="page">Home</a></li>
            <li className="nav-item"><a href="#" className="nav-link">Features</a></li>
            <li className="nav-item"><a href="#" className="nav-link">Pricing</a></li>
            <li className="nav-item"><a href="#" className="nav-link">FAQs</a></li>
            <li className="nav-item"><a href="https://github.com/TimurCravtov/sda_individual" target="_blank" className="nav-link">About</a></li>
        </ul>
    </header>)
}

export default Header;
