import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const EmptyView = ({ 
    icon, 
    title, 
    message, 
    link, 
    buttonText,
    buttonIcon,
    variant = 'default',
    className = '',
    children 
}) => {
    // Clases base con variantes
    const getVariantClass = () => {
        const variants = {
            default: '',
            search: 'empty-view--search',
            cart: 'empty-view--cart',
            wishlist: 'empty-view--wishlist',
            orders: 'empty-view--orders'
        };
        return variants[variant] || variants.default;
    };

    return (
        <div className={`empty-view ${getVariantClass()} ${className}`}>
            <div className="empty-view__icon" aria-hidden="true">
                {icon || (
                    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                )}
            </div>
            
            <div className="empty-view__content">
                {title && <h2 className="empty-view__title">{title}</h2>}
                {message && <p className="empty-view__message">{message}</p>}
                
                {children}
                
                {link && (
                    <Link 
                        to={link} 
                        className="empty-view__action btn btn--primary"
                        aria-label={buttonText}
                    >
                        {buttonIcon && <span className="empty-view__action-icon">{buttonIcon}</span>}
                        {buttonText}
                    </Link>
                )}
            </div>
        </div>
    );
};

EmptyView.propTypes = {
    icon: PropTypes.node,
    title: PropTypes.string,
    message: PropTypes.string.isRequired,
    link: PropTypes.string,
    buttonText: PropTypes.string,
    buttonIcon: PropTypes.node,
    variant: PropTypes.oneOf(['default', 'search', 'cart', 'wishlist', 'orders']),
    className: PropTypes.string,
    children: PropTypes.node
};

EmptyView.defaultProps = {
    buttonText: 'Volver a la tienda',
    variant: 'default'
};

export default EmptyView;