import React from 'react';
import creditwise_logo from '../static/creditwise_logo.png';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {

    const location = useLocation();
    return (
        <header style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            padding: '1rem 0',
            marginBottom: '1rem',
            // marginRight: '1rem',
            boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.1)', /* Horizontal offset, vertical offset, blur radius, and color */
            borderBottom: '1px solid #dee2e6'
        }}>
            <a href="/" style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '0.5rem',
                marginRight: '3.5rem',
                textDecoration: 'none',
                color: '#000000',
                fontSize: '1.5rem',
                fontWeight: 'bold'
            }}>
                <img src={creditwise_logo} width="35" height="35" alt="supposed to be the logo" style={{marginRight: '0.5rem'}} />
                CreditWise
            </a>

            <ul style={{display: 'flex', flexDirection: 'row', listStyle: 'none', margin: 1, padding: 0, marginRight: "0.5rem"}}>
                <li style={{marginRight: '1rem'}}><Link to={`/`} style={{
                    textDecoration: 'none',
                    color: location.pathname === '/' ? '#fff' : '#000',
                    padding: '0.5rem',
                    borderRadius: '0.5rem',
                    backgroundColor: location.pathname === '/' ? '#6868ac' : '#f0f0f0',
                    border: 'none'
                }}>Home</Link></li>
                <li style={{marginRight: '1rem'}}><Link to={`/banks`} style={{
                    textDecoration: 'none',
                    color: location.pathname === '/banks' ? '#fff' : '#000',
                    padding: '0.5rem',
                    borderRadius: '0.5rem',
                    backgroundColor: location.pathname === '/banks' ? '#6868ac' : '#f0f0f0',
                    border: '1px solid transparent'
                }}>Banks</Link></li>
                <li style={{marginRight: '1rem'}}><Link to={`/universalloan`} style={{
                    textDecoration: 'none',
                    color: location.pathname === '/universalloan' ? '#fff' : '#000',
                    padding: '0.5rem',
                    borderRadius: '0.5rem',
                    backgroundColor: location.pathname === '/universalloan' ? '#6868ac' : '#f0f0f0',
                    border: '1px solid transparent'
                }}>Universal Loan</Link></li>
                <li><a href="https://github.com/TimurCravtov/sda_individual" target="_blank" rel="noopener noreferrer"
                       style={{
                           textDecoration: 'none',
                           color: '#000',
                           padding: '0.5rem',
                           borderRadius: '0.25rem',
                           backgroundColor: '#f0f0f0',
                           border: '1px solid transparent'
                       }}>About</a></li>
            </ul>
        </header>
    );
}


export default Header;
