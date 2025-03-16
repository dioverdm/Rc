import {FaShippingFast, FaShieldAlt, FaTags, FaCreditCard} from 'react-icons/fa';

const servicesData = [
    {
        id: 1,
        icon: <FaShippingFast />,
        title: "Entrega rápida",
        info: "Envíos en 24 horas",
    },
    {
        id: 2,
        icon: <FaShieldAlt />,
        title: "Garantía de marca",
        info: "Productos 100% originales",
    },
    {
        id: 3,
        icon: <FaTags />,
        title: "Ofertas emocionantes",
        info: "En todos los pedidos prepagos",
    },
    {
        id: 4,
        icon: <FaCreditCard />,
        title: "Pagos seguros",
        info: "Metodos de pago directos",
    },
];

export default servicesData;