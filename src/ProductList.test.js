import React from "react";
import ProductList from "./ProductList";
import {shallow} from "enzyme";
import Product from "./Product";
import {DOWN_VOTE, UP_VOTE} from "./constants";

describe("ProductList", () => {
    let wrapper, oneProduct, twoProducts;

    beforeEach(() => {
        oneProduct = [{
            id: 2, name: "bose headphones", price: 265, likes: 100,
        }];
        twoProducts = [...oneProduct, {
            id: 7, name: "macbook pro", price: 1200, likes: 300,
        }];
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
        beforeEach(() => {
            wrapper.setState({products: twoProducts});
            wrapper.setState({votedProducts: []});
        });

        it("Given the UP vote button has been clicked votes count increases by one", () => {
            wrapper.instance().handleVoteClick(7, UP_VOTE);
            expect(wrapper.state().products[1].id).toEqual(7);
            expect(wrapper.state().products[1].likes).toEqual(301);
        });

        it("Given 2 UP votes, count increases by one", () => {
            wrapper.instance().handleVoteClick(7, UP_VOTE);
            wrapper.instance().handleVoteClick(7, UP_VOTE);
            expect(wrapper.state().products[1].id).toEqual(7);
            expect(wrapper.state().products[1].likes).toEqual(301);
        });

        it("Given the UP vote button has been clicked the product id is added to voteProducts state", () => {
            wrapper.instance().handleVoteClick(7, UP_VOTE);

            expect(wrapper.state().votedProducts).toEqual([{id: 7, vote: UP_VOTE}]);
        });

        it("Given the DOWN vote button has been clicked votes count decrements by one", () => {
            wrapper.setState({votedProducts: []});
            wrapper.instance().handleVoteClick(7, DOWN_VOTE);
            expect(wrapper.state().products[1].id).toEqual(7);
            expect(wrapper.state().products[1].likes).toEqual(299);
        });

        it("Given the DOWN vote button has been clicked the product id is removed from voteProducts state", () => {
            wrapper.setState({votedProducts: [{id: 7, vote: UP_VOTE}]});

            wrapper.instance().handleVoteClick(7, DOWN_VOTE);

            expect(wrapper.state().votedProducts).toEqual([{id: 7, vote: DOWN_VOTE}]);
        });

        it("Given 2 DOWN votes, count decreases by one", () => {
            wrapper.instance().handleVoteClick(7, DOWN_VOTE);
            wrapper.instance().handleVoteClick(7, DOWN_VOTE);
            expect(wrapper.state().products[1].id).toEqual(7);
            expect(wrapper.state().products[1].likes).toEqual(299);
        });
    });

    describe("Vot HTTP request is successful", () => {
        beforeEach(() => {
            wrapper.setState({products: twoProducts});
            wrapper.setState({votedProducts: []});

            wrapper.instance().requestHandler.idsToFail = [];
        });

        it("UP vote counts as +1 vote", () => {
            wrapper.instance().handleVoteClick(7, DOWN_VOTE);
            expect(wrapper.state().products[1].id).toEqual(7);
            expect(wrapper.state().products[1].likes).toEqual(299);
        });

        it("DOWN vote counts as -1 vote", () => {
            wrapper.instance().handleVoteClick(7, UP_VOTE);
            expect(wrapper.state().products[1].id).toEqual(7);
            expect(wrapper.state().products[1].likes).toEqual(301);
        });

        it("2 DOWN votes counts as -1 vote", () => {
            wrapper.instance().handleVoteClick(7, UP_VOTE);
            wrapper.instance().handleVoteClick(7, UP_VOTE);
            expect(wrapper.state().products[1].id).toEqual(7);
            expect(wrapper.state().products[1].likes).toEqual(301);
        });
    });

    describe("Vot HTTP request fails", () => {
        beforeEach(() => {
            wrapper.setState({products: twoProducts});
            wrapper.setState({votedProducts: []});

            wrapper.instance().requestHandler.idsToFail = [7];
        });

        function callback(done){
            expect(wrapper.state().products[1].id).toEqual(7);
            expect(wrapper.state().products[1].likes).toEqual(300);
            done();
        }

        it("UP vote is reverted", (done) => {
            wrapper.instance().handleVoteClick(7, UP_VOTE, callback(done));
        });

        it("DOWN vote is reverted", (done) => {
            wrapper.instance().handleVoteClick(7, DOWN_VOTE, callback(done));
        });
    });
});
