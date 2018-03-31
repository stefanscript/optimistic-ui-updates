import React from "react";
import PropTypes from "prop-types";
import {UP_VOTE, DOWN_VOTE} from "./constants";

const Product = ({
    id, name, price, likes, onVoteClick,
}) => (
    <article className="product" id={`article_${id}`}>
        <div className="likes">
            <div className="count">{likes}</div>
            <div className="controls">
                <button className="up" onClick={() => onVoteClick(id, UP_VOTE)}>+</button>
                <button className="down" onClick={() => onVoteClick(id, DOWN_VOTE)}>-</button>
            </div>
        </div>
        <div className="product-details">
            <div className="name">{name}</div>
            <div className="price-box">&pound;<span className="price">{price}</span></div>
        </div>
    </article>
);

Product.propTypes = {
    id: PropTypes.number,
    name: PropTypes.string,
    price: PropTypes.number,
    likes: PropTypes.number,
    onVoteClick: PropTypes.func,
};

export default Product;
