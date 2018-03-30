import React from 'react';

const Product = ({id, name, price, likes}) => {
    return (
        <article className="product">
            <div className="likes">
                <div className="count">{likes}</div>
                <div className="controls">
                    <button className="up">u</button>
                    <button className="down">d</button>
                </div>
            </div>
            <div className="product-details">
                <div className="name">{name}</div>
                <div className="price-box">&pound;<span className="price">{price}</span></div>
            </div>
        </article>
    );
};
export default Product;