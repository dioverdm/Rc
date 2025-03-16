import { FaFacebookF, FaInstagram, FaTiktok } from 'react-icons/fa';

export const footMenu = [
    {
        id: 1,
        title: "Ayuda",
        menu: [
            {
                id: 1,
                link: "FAQs",
                path: "/"
            },
            {
                id: 2,
                link: "Seguimiento de pedidos",
                path: "/"
            },
            {
                id: 3,
                link: "Cancelar pedido",
                path: "/"
            },
            {
                id: 4,
                link: "Devolución de pedido",
                path: "/"
            },
            {
                id: 5,
                link: "Información de garantía",
                path: "/"
            },
        ]
    },
    {
        id: 2,
        title: "Políticas",
        menu: [
            {
                id: 1,
                link: "Política de devoluciones",
                path: "/"
            },
            {
                id: 2,
                link: "Seguridad",
                path: "/"
            },
            {
                id: 3,
                link: "Mapa del sitio",
                path: "/"
            },
            {
                id: 4,
                link: "Política de privacidad",
                path: "/"
            },
            {
                id: 5,
                link: "Términos y condiciones",
                path: "/"
            },
        ]
    },
    {
        id: 3,
        title: "Compañía",
        menu: [
            {
                id: 1,
                link: "Sobre nosotros",
                path: "/"
            },
            {
                id: 2,
                link: "Contáctenos",
                path: "/"
            },
            {
                id: 3,
                link: "Centros de servicio",
                path: "/"
            },
            {
                id: 4,
                link: "Carreras",
                path: "/"
            },
            {
                id: 5,
                link: "Afiliados",
                path: "/"
            },
        ]
    }
];

export const footSocial = [
    {
        id: 1,
        icon: <FaFacebookF />,
        path: "/",
    },
    {
        id: 2,
        icon: <FaInstagram />,
        path: "/",
    },
    {
        id: 3,
        icon: <FaTiktok />,
        path: "/",
    },
];
