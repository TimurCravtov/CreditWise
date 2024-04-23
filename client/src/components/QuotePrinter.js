import React, { useState, useEffect } from 'react';

const Typewriter = ({ text }) => {
    const [displayText, setDisplayText] = useState('');
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            if (index < text.length) {
                setDisplayText(prevText => prevText + text[index]);
                setIndex(prevIndex => prevIndex + 1);
            } else {
                clearInterval(interval);
            }
        }, 40); // скорость печати, в миллисекундах
        return () => clearInterval(interval);
    }, [index, text]);

    return <div>{displayText}</div>;
};

const QuotePrinter = () => {
    return (
        <div>
            <Typewriter text="Money is a terrible master but an excellent servant.

            --P.T. Barnum" />
        </div>
    );
};

export default QuotePrinter;
