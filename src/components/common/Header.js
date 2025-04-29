import React, { useContext, useEffect, useState, useCallback, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  AiOutlineSearch, 
  AiOutlineShoppingCart, 
  AiOutlineUser,
  AiOutlineClose 
} from 'react-icons/ai';
import { FiMenu } from 'react-icons/fi';
import PropTypes from 'prop-types';
import { dropdownMenu } from '../../data/headerData';
import commonContext from '../../contexts/common/commonContext';
import cartContext from '../../contexts/cart/cartContext';
import AccountForm from '../form/AccountForm';
import SearchBar from './SearchBar';
import useDebounce from '../../hooks/useDebounce';
import useDeviceType from '../../hooks/useDeviceType';

const Header = () => {
    const navigate = useNavigate();
    const { formUserInfo, toggleForm, toggleSearch } = useContext(commonContext);
    const { cartItems } = useContext(cartContext);
    const [isSticky, setIsSticky] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const deviceType = useDeviceType();
    const isMobile = deviceType === 'mobile';

    // Debounced scroll handler
    const handleScroll = useCallback(() => {
        const shouldBeSticky = window.scrollY >= 50;
        if (shouldBeSticky !== isSticky) {
            setIsSticky(shouldBeSticky);
        }
    }, [isSticky]);

    const debouncedScrollHandler = useDebounce(handleScroll, 100);

    // Sticky header effect
    useEffect(() => {
        window.addEventListener('scroll', debouncedScrollHandler);
        return () => {
            window.removeEventListener('scroll', debouncedScrollHandler);
        };
    }, [debouncedScrollHandler]);

    // Calcula la cantidad total de items en el carrito
    const cartQuantity = useMemo(() => {
        return cartItems.reduce((total, item) => total + item.quantity, 0);
    }, [cartItems]);

    // Cierra el menú móvil al cambiar de ruta
    useEffect(() => {
        if (mobileMenuOpen) {
            setMobileMenuOpen(false);
        }
    }, [navigate]);

    // Maneja el cierre del menú al hacer clic fuera
    const handleClickOutside = useCallback((e) => {
        if (e.target.closest('.user_action') === null) {
            setMobileMenuOpen(false);
        }
    }, []);

    useEffect(() => {
        if (mobileMenuOpen) {
            document.addEventListener('mousedown', handleClickOutside);
            document.body.style.overflow = 'hidden';
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
            document.body.style.overflow = '';
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.body.style.overflow = '';
        };
    }, [mobileMenuOpen, handleClickOutside]);

    return (
        <>
            <header 
                className={`header ${isSticky ? 'sticky' : ''}`}
                role="banner"
            >
                <div className="header__container">
                    {/* Logo */}
                    <Link to="/" className="header__logo" aria-label="Inicio">
                        <img 
                            src="/banner.png" 
                            alt="Repuestos Caribe Logo" 
                            width="100"
                            height="40"
                            loading="eager"
                        />
                    </Link>

                    {/* Menú de navegación principal (desktop) */}
                    {!isMobile && (
                        <nav className="header__nav" aria-label="Navegación principal">
                            <ul className="header__nav-list">
                                <li className="header__nav-item">
                                    <Link to="/catalogo" className="header__nav-link">
                                        Catálogo
                                    </Link>
                                </li>
                                <li className="header__nav-item">
                                    <Link to="/ofertas" className="header__nav-link">
                                        Ofertas
                                    </Link>
                                </li>
                                <li className="header__nav-item">
                                    <Link to="/nosotros" className="header__nav-link">
                                        Nosotros
                                    </Link>
                                </li>
                            </ul>
                        </nav>
                    )}

                    {/* Acciones del header */}
                    <div className="header__actions">
                        {/* Botón de búsqueda */}
                        <button 
                            className="header__action header__action--search"
                            onClick={() => toggleSearch(true)}
                            aria-label="Buscar productos"
                        >
                            <AiOutlineSearch size={20} />
                        </button>

                        {/* Carrito */}
                        <Link 
                            to="/carrito" 
                            className="header__action header__action--cart"
                            aria-label="Carrito de compras"
                        >
                            <AiOutlineShoppingCart size={20} />
                            {cartQuantity > 0 && (
                                <span className="header__cart-badge">
                                    {cartQuantity}
                                </span>
                            )}
                        </Link>

                        {/* Menú de usuario */}
                        <div className="header__action header__action--user">
                            <button 
                                className="user-toggle"
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                aria-expanded={mobileMenuOpen}
                                aria-label="Menú de usuario"
                            >
                                {mobileMenuOpen ? (
                                    <AiOutlineClose size={20} />
                                ) : (
                                    <AiOutlineUser size={20} />
                                )}
                            </button>

                            {/* Dropdown menu */}
                            {mobileMenuOpen && (
                                <div className="user-dropdown">
                                    <div className="user-dropdown__header">
                                        <h4>
                                            {formUserInfo ? (
                                                <>
                                                    Hola <Link to="/cuenta">{formUserInfo}</Link>
                                                </>
                                            ) : (
                                                'Bienvenido'
                                            )}
                                        </h4>
                                        <p>Accede a tu cuenta y gestiona tus pedidos</p>
                                        
                                        {!formUserInfo && (
                                            <button
                                                type="button"
                                                className="user-dropdown__login-btn"
                                                onClick={() => {
                                                    toggleForm(true);
                                                    setMobileMenuOpen(false);
                                                }}
                                            >
                                                Iniciar sesión / Registrarse
                                            </button>
                                        )}
                                    </div>

                                    <div className="user-dropdown__separator"></div>

                                    <ul className="user-dropdown__menu">
                                        {dropdownMenu.map(({ id, link, path }) => (
                                            <li key={id} className="user-dropdown__item">
                                                <Link 
                                                    to={path} 
                                                    className="user-dropdown__link"
                                                    onClick={() => setMobileMenuOpen(false)}
                                                >
                                                    {link}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>

                        {/* Menú hamburguesa (mobile) */}
                        {isMobile && (
                            <button 
                                className="header__action header__action--menu"
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                aria-label="Menú principal"
                            >
                                <FiMenu size={20} />
                            </button>
                        )}
                    </div>
                </div>

                {/* Menú móvil */}
                {isMobile && mobileMenuOpen && (
                    <div className="mobile-menu">
                        <div className="mobile-menu__header">
                            <button 
                                className="mobile-menu__close"
                                onClick={() => setMobileMenuOpen(false)}
                                aria-label="Cerrar menú"
                            >
                                <AiOutlineClose size={24} />
                            </button>
                        </div>
                        
                        <nav className="mobile-menu__nav">
                            <ul className="mobile-menu__list">
                                <li className="mobile-menu__item">
                                    <Link 
                                        to="/catalogo" 
                                        className="mobile-menu__link"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        Catálogo
                                    </Link>
                                </li>
                                <li className="mobile-menu__item">
                                    <Link 
                                        to="/ofertas" 
                                        className="mobile-menu__link"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        Ofertas
                                    </Link>
                                </li>
                                <li className="mobile-menu__item">
                                    <Link 
                                        to="/nosotros" 
                                        className="mobile-menu__link"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        Nosotros
                                    </Link>
                                </li>
                                <li className="mobile-menu__item">
                                    <Link 
                                        to="/contacto" 
                                        className="mobile-menu__link"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        Contacto
                                    </Link>
                                </li>
                            </ul>
                        </nav>
                    </div>
                )}
            </header>

            <SearchBar />
            <AccountForm />
        </>
    );
};

Header.propTypes = {
    dropdownMenu: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
            link: PropTypes.string.isRequired,
            path: PropTypes.string.isRequired
        })
    )
};

Header.defaultProps = {
    dropdownMenu: []
};

export default React.memo(Header);