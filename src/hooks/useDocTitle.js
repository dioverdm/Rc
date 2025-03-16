import { useEffect } from 'react';

const useDocTitle = (title) => {
    useEffect(() => {
        if (title) {
            document.title = `${title} - Respuestos Caribe`;
        } else {
            document.title = 'Respuestos Caribe | Piezas automotriz | Hyundai | Kia | Mitsubishi';
        }
    }, [title]);

    return null;
};

export default useDocTitle;
