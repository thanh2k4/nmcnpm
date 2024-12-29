import React from 'react';
import './Button.css';
import {Link} from 'react-router-dom';

// Button homepage
const STYLES = ['btn--primary', 'btn--outline', 'btn--home', 'btn--food', 'btn--cart']
const SIZES = ['btn--medium', 'btn--large']

export const Button = (
    {
        children,
        type,
        onClick,
        buttonStyle,
        buttonSize,
        to = '/sign-up'
    }
) => {
    const checkButtonStyle = STYLES.includes(buttonStyle) ? buttonStyle : STYLES[0];
    const checkButtonSize = SIZES.includes(buttonSize) ? buttonSize : SIZES[0];

    return (
        <Link to={to} className="btn-mobile">
            <button className={`btn ${checkButtonStyle} ${checkButtonSize}`}
                onClick={onClick}
                type={type}
            >
            {children}
         </button>
        </Link>
    )
};