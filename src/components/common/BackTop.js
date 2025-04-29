import React, { useEffect, useState, useCallback } from 'react';
import { FaChevronUp } from 'react-icons/fa';
import { debounce } from 'lodash';

const BackTop = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [scrollProgress, setScrollProgress] = useState(0);

    // Debounced scroll handler para mejor rendimiento
    const handleScroll = useCallback(() => {
        const scrollY = window.scrollY;
        const windowHeight = window.innerHeight;
        const fullHeight = document.body.scrollHeight;
        
        // Calcular progreso del scroll (0-100)
        const progress = Math.min(100, (scrollY / (fullHeight - windowHeight)) * 100);
        setScrollProgress(progress);
        
        // Mostrar botón después de 300px de scroll
        setIsVisible(scrollY > 300);
    }, []);

    // Versión debounced del manejador
    const debouncedScrollHandler = useCallback(
        debounce(handleScroll, 100),
        [handleScroll]
    );

    // Configurar event listener
    useEffect(() => {
        window.addEventListener('scroll', debouncedScrollHandler);
        return () => {
            window.removeEventListener('scroll', debouncedScrollHandler);
            debouncedScrollHandler.cancel();
        };
    }, [debouncedScrollHandler]);

    // Función para volver arriba
    const handleBackTop = useCallback(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        
        // Opcional: Enfocar el elemento principal para accesibilidad
        const mainContent = document.querySelector('main');
        if (mainContent) {
            mainContent.setAttribute('tabindex', '-1');
            mainContent.focus();
        }
    }, []);

    // Opcional: Manejar tecla Enter para accesibilidad
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleBackTop();
        }
    };

    return (
        <button
            className={`back-top ${isVisible ? 'active' : ''}`}
            aria-label="Volver al inicio de la página"
            onClick={handleBackTop}
            onKeyDown={handleKeyDown}
            tabIndex={isVisible ? 0 : -1}
            style={{
                '--progress': `${scrollProgress}%`
            }}
        >
            <FaChevronUp aria-hidden="true" />
            
            {/* Opcional: Indicador visual de progreso */}
            <span className="back-top__progress" />
            
            <span className="sr-only">Volver arriba</span>
        </button>
    );
};

export default React.memo(BackTop);