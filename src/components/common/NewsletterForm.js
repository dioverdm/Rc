import React, { useState } from 'react';
import PropTypes from 'prop-types';

const NewsletterForm = ({
    onSubmit,
    placeholder,
    buttonText,
    successMessage,
    privacyText,
    className
}) => {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState('idle'); // 'idle' | 'loading' | 'success' | 'error'
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('loading');
        
        try {
            await onSubmit(email);
            setStatus('success');
            setEmail('');
        } catch (err) {
            setStatus('error');
            setError('Error al procesar la suscripción. Intenta nuevamente.');
        }
    };

    return (
        <div className={`newsletter-form ${className || ''}`}>
            {status === 'success' ? (
                <div className="newsletter-form__success" aria-live="polite">
                    {successMessage}
                </div>
            ) : (
                <>
                    <form onSubmit={handleSubmit} className="newsletter-form__form">
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder={placeholder}
                            required
                            disabled={status === 'loading'}
                            className="newsletter-form__input"
                            aria-label="Email para suscripción"
                        />
                        <button 
                            type="submit" 
                            disabled={status === 'loading'}
                            className="newsletter-form__button"
                        >
                            {status === 'loading' ? 'Enviando...' : buttonText}
                        </button>
                    </form>
                    
                    {privacyText && (
                        <p className="newsletter-form__privacy">
                            {privacyText}
                        </p>
                    )}
                    
                    {status === 'error' && (
                        <p className="newsletter-form__error" aria-live="assertive">
                            {error}
                        </p>
                    )}
                </>
            )}
        </div>
    );
};

NewsletterForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    buttonText: PropTypes.string,
    successMessage: PropTypes.string,
    privacyText: PropTypes.string,
    className: PropTypes.string
};

NewsletterForm.defaultProps = {
    placeholder: 'Tu email',
    buttonText: 'Suscribir',
    successMessage: '¡Gracias por suscribirte!',
    privacyText: ''
};

export default NewsletterForm;