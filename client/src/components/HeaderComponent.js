import React from 'react';
import creditwise_logo from '../static/creditwise_logo.png';
import { Link, useLocation } from 'react-router-dom';

function Header() {
    const location = useLocation();

    return (
        <header style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', padding: '1.5rem 0', marginBottom: '1rem', borderBottom: '1px solid #dee2e6' }}>
            <a href="/" style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem', marginRight: 'auto', textDecoration: 'none', color: '#000000', fontSize: '1.5rem', fontWeight: 'bold' }}>
                <img src={creditwise_logo} width="35" height="35" alt="supposed to be the logo" style={{ marginRight: '0.5rem' }} />
                CreditWise
            </a>

            <ul style={{ display: 'flex', flexDirection: 'row', listStyle: 'none', margin: 0, padding: 0 }}>
                <li style={{ marginRight: '1rem' }}><Link to={`/`} style={{ textDecoration: 'none', color: location.pathname === '/' ? '#fff' : '#000', padding: '0.5rem', borderRadius: '0.5rem', backgroundColor: location.pathname === '/' ? '#b12930' : '#f0f0f0', border: 'none' }}>Home</Link></li>
                <li style={{ marginRight: '1rem' }}><a href="#" style={{ textDecoration: 'none', color: '#000', padding: '0.5rem', borderRadius: '0.5rem', backgroundColor: '#f0f0f0', border: '1px solid transparent' }}>Features</a></li>
                <li style={{ marginRight: '1rem' }}><a href="#" style={{ textDecoration: 'none', color: '#000000', padding: '0.5rem', borderRadius: '0.5rem', backgroundColor: '#f0f0f0', border: '1px solid transparent' }}>Pricing</a></li>
                <li style={{ marginRight: '1rem' }}><a href="#" style={{ textDecoration: 'none', color: '#000', padding: '0.5rem', borderRadius: '0.5rem', backgroundColor: '#f0f0f0', border: '1px solid transparent' }}>FAQs</a></li>
                <li><a href="https://github.com/TimurCravtov/sda_individual" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: '#000', padding: '0.5rem', borderRadius: '0.25rem', backgroundColor: '#f0f0f0', border: '1px solid transparent' }}>About</a></li>
            </ul>
        </header>
    );
}

export default Header;
