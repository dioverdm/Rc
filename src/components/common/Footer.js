import React, { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { footMenu, footSocial } from '../../data/footerData';
import InstallPWA from './appInstall';
import NewsletterForm from './NewsletterForm';

const Footer = () => {
    const currYear = new Date().getFullYear();

    // Manejador de suscripción mejorado
    const handleSubscription = useCallback((email) => {
        // Aquí iría la lógica real de suscripción
        console.log('Email suscrito:', email);
        return Promise.resolve(); // Simulamos una promesa para el estado de carga
    }, []);

    return (
        <footer className="footer" aria-label="Pie de página">
            <div className="footer__container">
                <div className="footer__wrapper">
                    {/* Sección de marca y newsletter */}
                    <div className="footer__brand">
                        <Link to="/" className="footer__logo">
                            <h2>Repuestos Caribe</h2>
                        </Link>
                        
                        <p className="footer__description">
                            Tu proveedor confiable de repuestos automotrices de alta calidad 
                            con más de 15 años en el mercado.
                        </p>

                        <NewsletterForm 
                            onSubmit={handleSubscription}
                            placeholder="Dirección de correo electrónico*"
                            buttonText="Suscribir"
                            successMessage="¡Gracias por suscribirte! Pronto recibirás nuestras ofertas."
                            privacyText="Al suscribirte aceptas nuestra política de privacidad"
                        />
                        
                        <InstallPWA className="footer__pwa" />
                    </div>

                    {/* Menús del footer */}
                    {footMenu.map(({ id, title, menu }) => (
                        <nav 
                            key={id} 
                            className="footer__menu"
                            aria-label={`Menú ${title.toLowerCase()}`}
                        >
                            <h3 className="footer__menu-title">{title}</h3>
                            <ul className="footer__menu-list">
                                {menu.map(({ id, link, path }) => (
                                    <li key={id} className="footer__menu-item">
                                        <Link 
                                            to={path} 
                                            className="footer__menu-link"
                                            aria-label={link}
                                        >
                                            {link}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    ))}
                </div>

                {/* Separador visual */}
                <div className="footer__separator" aria-hidden="true"></div>

                {/* Sub-footer */}
                <div className="footer__bottom">
                    <div className="footer__copyright">
                        <p>
                            &copy; {currYear} Repuestos Caribe. Todos los derechos reservados.
                            <br />
                            Desarrollado por{' '}
                            <a 
                                href="https://dioverdm.com/" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="footer__dev-link"
                            >
                                DioverDM
                            </a>
                        </p>
                    </div>

                    <div className="footer__social">
                        {footSocial.map(({ id, icon, path, label }) => (
                            <Link
                                key={id}
                                to={path}
                                className="footer__social-link"
                                aria-label={label || `Ir a ${icon.type.displayName}`}
                            >
                                {icon}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
};

// PropTypes para validación
Footer.propTypes = {
    footMenu: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
            title: PropTypes.string.isRequired,
            menu: PropTypes.arrayOf(
                PropTypes.shape({
                    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
                    link: PropTypes.string.isRequired,
                    path: PropTypes.string.isRequired
                })
            ).isRequired
        })
    ),
    footSocial: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
            icon: PropTypes.node.isRequired,
            path: PropTypes.string.isRequired,
            label: PropTypes.string
        })
    )
};

// Valores por defecto
Footer.defaultProps = {
    footMenu: [],
    footSocial: []
};

export default React.memo(Footer);