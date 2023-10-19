import React from 'react';

// Defining a reusable Button component that accepts label, onClick, and className as props
const Button = ({ label, onClick, className }) => {
    return (
        // Render a button with the provided label, click handler, and class name
        <button onClick={onClick} className={className}>
            {label}
        </button>
    );
}

export { Button };
