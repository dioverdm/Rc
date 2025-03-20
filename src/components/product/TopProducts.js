import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BsArrowRight } from 'react-icons/bs';
import useActive from '../../hooks/useActive';
import productsData from '../../data/productsData';
import ProductCard from './ProductCard';


const TopProducts = () => {

    const [products, setProducts] = useState(productsData);
    const { activeClass, handleActive } = useActive(0);

    // making a unique set of product's category
    const productsCategory = [
        'Todos',
        ...new Set(productsData.map(item => item.brand))
    ];

    // handling product's filtering
    const handleProducts = (brand, i) => {
        if (category === 'Todos') {
            setProducts(productsData);
            handleActive(i);
            return;
        }

        const filteredProducts = productsData.filter(item => item.brand === brand);
        setProducts(filteredProducts);
        handleActive(i);
    };


    return (
        <>
            <div className="products_filter_tabs">
                <ul className="tabs">
                    {
                        productsCategory.map((item, i) => (
                            <li
                                key={i}
                                className={`tabs_item ${activeClass(i)}`}
                                onClick={() => handleProducts(item, i)}
                            >
                                {item}
                            </li>
                        ))
                    }
                </ul>
            </div>
            <div className="wrapper products_wrapper">
                {
                    products.slice(0, 11).map(item => (
                        <ProductCard
                            key={item.id}
                            {...item}
                        />
                    ))
                }
                <div className="card products_card browse_card">
                    <Link to="/all-products">
                        Explorar todos los <br /> productos <BsArrowRight />
                    </Link>
                </div>
            </div>
        </>
    );
};

export default TopProducts;