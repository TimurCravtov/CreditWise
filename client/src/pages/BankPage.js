import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useParams } from "react-router-dom";

const BankPage = () => {
    const { bankName } = useParams();
    const [bank, setBank] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchBank();
    }, [bankName]);

    const fetchBank = async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/bank/${bankName}`);
            if (!response.ok) {
                throw new Error('Failed to fetch bank');
            }
            const data = await response.json();
            setBank(data);
        } catch (error) {
            console.error('Error fetching bank:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h2>Bank Page</h2>
            {loading ? (
                <p>Loading...</p>
            ) : bank ? (
                <div>
                    <p>Name: {bank.name}</p>
                    <p>ID: {bank.id}</p>
                    <img src={bank.logo_path} alt="Bank Logo" />
                </div>
            ) : (
                <p>Bank not found</p>
            )}
            <Link to="/banks">Back to Bank List</Link>
        </div>
    );
}

export default BankPage;