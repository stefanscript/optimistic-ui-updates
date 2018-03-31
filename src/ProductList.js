import React, {Component} from "react";
import Product from "./Product";
import {UP_VOTE} from "./constants";

const products = [
    {id: 2, name: "Bose headphones", price: 265, likes: 478},
    {id: 6, name: "Macbook pro", price: 1230, likes: 331},
    {id: 8, name: "Running shoes", price: 125, likes: 99}
];

class ProductList extends Component {
    state = {
        products: products
    };

    handleVoteClick = (id, vote) => {
        console.log("Product", id, vote);
        const voteValue = vote === UP_VOTE ? 1 : -1;
        this.setState((prevState) => {
            return {
                products: prevState.products.map((product) => {
                    return product.id === id ? {...product, likes: product.likes + voteValue} : product;
                })
            }
        });
    };

    render(){
        const productsToRender = this.state.products.map(product => {
            return <Product
                key={product.id}
                {...product}
                onVoteClick={this.handleVoteClick}
            />;
        });

        return (
            <div className="products">
                {productsToRender}
            </div>
        );
    }
}

ProductList.defaultProps = {
    products: [],
};

export default ProductList;
