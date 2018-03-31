import React from "react";
import ProductList from "./ProductList";
import {shallow} from "enzyme";
import Product from "./Product";
import {UP_VOTE} from "./constants";

describe("ProductList", () => {
    let wrapper;
    const oneProduct = [{
        id: 2, name: "bose headphones", price: 265, likes: 100,
    }];
    const twoProducts = [...oneProduct, {
        id: 7, name: "macbook pro", price: 1200, likes: 300,
    }];

    beforeEach(() => {
        wrapper = shallow(<ProductList />);
    });

    it("Given a list with 0 products, no product gets displayed", () => {
        wrapper.setState({products: []});
        expect(wrapper.find(Product).length).toEqual(0);
    });

    it("Given a list with 1 product, the product gets displayed", () => {
        wrapper.setState({products: oneProduct});
        expect(wrapper.find(Product).length).toEqual(1);
    });

    it("Given a list with 2 products, the product gets displayed", () => {
        wrapper.setState({products: twoProducts});
        expect(wrapper.find(Product).length).toEqual(2);
    });

    describe("Optimistic Voting", () => {
        it("Given the up vote button has been clicked votes count increases", () => {
            wrapper.setState({products: twoProducts});
            wrapper.instance().handleVoteClick(7, UP_VOTE);
            expect(wrapper.state().products[1].id).toEqual(7);
            expect(wrapper.state().products[1].likes).toEqual(301);
        });
    });
});
