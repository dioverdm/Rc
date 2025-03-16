import React from 'react';
import reviewsData from '../../data/reviewsData';
import useActive from '../../hooks/useActive';
import ProductReviews from './ProductReviews';


const ProductSummary = (props) => {

    const { brand, title, info, category, type, connectivity } = props;

    const { active, handleActive, activeClass } = useActive('specs');


    return (
        <>
            <section id="product_summary" className="section">
                <div className="container">

                    {/*===== Product-Summary-Tabs =====*/}
                    <div className="prod_summary_tabs">
                        <ul className="tabs">
                            <li
                                className={`tabs_item ${activeClass('specs')}`}
                                onClick={() => handleActive('specs')}
                            >
                                Presupuesto
                            </li>
                            <li
                                className={`tabs_item ${activeClass('overview')}`}
                                onClick={() => handleActive('overview')}
                            >
                              Descripción
                            </li>
                            <li
                                className={`tabs_item ${activeClass('reviews')}`}
                                onClick={() => handleActive('reviews')}
                            >
                                Reseñas
                            </li>
                        </ul>
                    </div>

                    {/*===== Product-Summary-Details =====*/}
                    <div className="prod_summary_details">
                        {
                            active === 'specs' ? (
                                <div className="prod_specs">
                                    <ul>
                                        <li>
                                            <span>Marca</span>
                                            <span>{brand}</span>
                                        </li>
                                        <li>
                                            <span>Modelo</span>
                                            <span>{title}</span>
                                        </li>
                                        <li>
                                            <span>Nombre genérico</span>
                                            <span>{category}</span>
                                        </li>
                                        <li>
                                            <span>Tipo</span>
                                            <span>{type}</span>
                                        </li>
                                        <li>
                                            <span>Capacidad</span>
                                            <span>{connectivity}</span>
                                        </li>
                                        <li>
                                            <span>Rango</span>
                                            <span>Yes</span>
                                        </li>
                                    </ul>
                                </div>
                            ) : active === 'overview' ? (
                                <div className="prod_overview">
                                    <h3>Las <span>{title}</span> {info} de una fabulosa calidad</h3>
                                    <ul>
                                        <li>Ejemplo 1</li>
                                        <li>Ejemplo 2</li>
                                        <li>Ejemplo 3</li>
                                    </ul>
                                    <p>Compre <b>{title} {info}</b> ahora y no se arrepentirá luego.</p>
                                </div>
                            ) : (
                                <div className="prod_reviews">
                                    <ul>
                                        {
                                            reviewsData.map(item => (
                                                <ProductReviews
                                                    key={item.id}
                                                    {...item}
                                                />
                                            ))
                                        }
                                    </ul>
                                </div>
                            )

                        }

                    </div>

                </div>
            </section>
        </>
    );
};

export default ProductSummary;