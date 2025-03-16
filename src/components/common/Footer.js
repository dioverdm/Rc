import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { footMenu, footSocial } from '../../data/footerData';


const Footer = () => {

    const [subValue, setSubValue] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubValue('');
        alert('Gracias, estás suscrito para recibir nuestro boletín diario.');
    };

    const currYear = new Date().getFullYear();


    return (
        <footer id="footer">
            <div className="container">
                <div className="wrapper footer_wrapper">
                    <div className="foot_about">
                        <h2>
                            <Link to="/">Respuestos Caribe</Link>
                        </h2>
                        <div className="foot_subs">
                            <p>Suscríbete a nuestras alertas por correo electrónico para recibir ofertas de descuento anticipadas e información sobre nuevos productos.</p>
                            <form onSubmit={handleSubmit}>
                                <input
                                    type="email"
                                    className="input_field"
                                    placeholder="Dirección de correo electrónico*"
                                    required
                                    value={subValue}
                                    onChange={(e) => setSubValue(e.target.value)}
                                />
                                <button type="submit" className="btn">Suscribir</button>
                            </form>
                        </div>
                    </div>

                    {
                        footMenu.map(item => {
                            const { id, title, menu } = item;
                            return (
                                <div className="foot_menu" key={id}>
                                    <h4>{title}</h4>
                                    <ul>
                                        {
                                            menu.map(item => {
                                                const { id, link, path } = item;
                                                return (
                                                    <li key={id}>
                                                        <Link to={path}>{link}</Link>
                                                    </li>
                                                );
                                            })
                                        }
                                    </ul>
                                </div>
                            );
                        })
                    }
                </div>
            </div>

            <div className="separator"></div>

            <div className="sub_footer">
                <div className="container">
                    <div className="sub_footer_wrapper">
                        <div className="foot_copyright">
                            <p>
                                {currYear} | Respuestos Caribe. Reservados todos los derechos.
                                Desarrollado por | <a href="https://dioverdm.com/">DioverDM</a>
                            </p>
                        </div>
                        <div className="foot_social">
                            {
                                footSocial.map((item) => {
                                    const { id, icon, path } = item;
                                    return (
                                        <Link to={path} key={id}>{icon}</Link>
                                    );
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        </footer >
    );
};

export default Footer;