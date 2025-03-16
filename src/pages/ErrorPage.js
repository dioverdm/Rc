import React from 'react';
import { Link } from 'react-router-dom';

const ErrorPage = () => {
    return (
        <>
            <section id="error_page" className="section">
                <div className="container">
                    <div className="error_page_content">
                        <h1>404</h1>
                        <h2>Extraviado</h2>
                        <h3>Lo sentimos, la página solicitada no fue encontrada.</h3>
                        <Link to="/" className="btn">Ir al inicio</Link>
                    </div>
                </div>
            </section>
        </>
    );
};

export default ErrorPage;