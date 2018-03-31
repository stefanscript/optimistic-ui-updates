import React, {Component} from "react";
import Product from "./Product";
import {DOWN_VOTE, UP_VOTE} from "./constants";
import LikeRequestHandler from "./tools/LikeRequestHandlerMock";

const products = [
    {id: 2, name: "Bose headphones", price: 265, likes: 478},
    {id: 6, name: "Macbook pro", price: 1230, likes: 331},
    {id: 8, name: "Running shoes", price: 125, likes: 99}
];

const getVoteValue = (voteValue) => voteValue === UP_VOTE ? 1 : -1;
const getRevertValue = (voteValue) => voteValue === UP_VOTE ? DOWN_VOTE : UP_VOTE;

class ProductList extends Component {
    state = {
        products: products,
        votedProducts: []
    };

    requestHandler = LikeRequestHandler;

    constructor(props) {
        super(props);
        this.requestHandler.idsToFail = [2];
    }

    updateState = (id, voteValue) => {
        this.setState((prevState) => {
            return {
                products: prevState.products.map((product) => {
                    return product.id === id ?
                        {...product, likes: product.likes + getVoteValue(voteValue)} :
                        product;
                }),
                votedProducts: prevState.votedProducts.filter(vote => id !== vote.id).concat([{
                    id: id,
                    vote: voteValue
                }])
            }
        });
    };

    handleVoteClick = (id, voteValue, callback) => {
        const self = this;
        console.log("Product", id, voteValue);
        console.log("votedProducts0", id, voteValue, this.state.votedProducts);
        const votedAlready = this.state.votedProducts.filter(vote => (vote.id === id && vote.vote === voteValue));
        console.log("votedAlready", votedAlready);

        if (votedAlready.length === 1) {
            return;
        }

        this.updateState(id, voteValue);

        this.requestHandler.like(id, voteValue)
            .then((data) => {
                console.log("data", data);
            }).catch((err) => {
                console.log("err", err);
                self.updateState(id, getRevertValue(voteValue));
            }).then(() => {
                callback ? callback() : console.log("done");
            });
    };

    render() {
        const productsToRender = this.state.products.map(product => {
            const requestWillFail = this.requestHandler.idsToFail.includes(product.id);
            const voted = this.state.votedProducts.filter(vote => vote.id === product.id);
            return <Product
                key={product.id}
                {...product}
                onVoteClick={this.handleVoteClick}
                requestWillFail={requestWillFail}
                voted={voted.length === 1}
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
