import React from 'react';
import Product from "./Product";

const ProductList = ({products}) => {
    const productsToRender = products.map((product) => <Product key={product.id} {...product} />);
    return <div className="products">{productsToRender}</div>
};

ProductList.defaultProps = {
    products: []
};

export default ProductList;