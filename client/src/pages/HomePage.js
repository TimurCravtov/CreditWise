import React from "react";
import { Link } from "react-router-dom"; // Import Link from React Router
import QuotePrinter from "../components/QuotePrinter";

const HomePage = () => {
    return (
        <div>
            <QuotePrinter/>
            <Link to="/banks">Go to banks page</Link> {/* Link to the other page */}
        </div>
    );
}

export default HomePage;
