
// Mostrar dinero en formato Chileno
export const displayMoney = (n) => {
    const numFormat = new Intl.NumberFormat('es-CL', {
        style: 'currency',
        currency: 'CLP',
    });

    return numFormat.format(n).split('.', 1);
};


// Calcular porcentaje de descuento
export const calculateDiscount = (discountedPrice, originalPrice) => {
    const discountedPercent = (discountedPrice / originalPrice) * 100;

    return Math.round(discountedPercent);
};


// Calcular importe total
export const calculateTotal = (arr) => {
    const total = arr.reduce((accum, val) => accum + val, 0);

    return total;
};
