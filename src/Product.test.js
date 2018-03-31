import React from "react";
import {shallow} from "enzyme";
import Product from "./Product";
import {DOWN_VOTE, UP_VOTE} from "./constants";

describe("Product", () => {
    let wrapper;
    let product;
    const onClick = jest.fn();

    beforeEach(() => {
        product = {id: 1, name: "Bose headphones", price: 110};
        wrapper = shallow(<Product {...product} onVoteClick={onClick} />);
    });

    it("Given a name of headphones it gets printed", () => {
        wrapper.setProps({name: "headphones"});
        expect(wrapper.find(".name").text()).toEqual("headphones");
    });

    it("Given a price of 300 it gets printed", () => {
        wrapper.setProps({price: 300});
        expect(wrapper.find(".price").text()).toEqual("300");
    });

    it("Given a likes counter of 160 it gets printed", () => {
        wrapper.setProps({likes: 160});
        expect(wrapper.find(".likes .count").text()).toEqual("160");
    });

    it("Likes controls are displayed", () => {
        expect(wrapper.find(".likes .controls .up").length).toEqual(1);
        expect(wrapper.find(".likes .controls .down").length).toEqual(1);
    });

    it("given I click on the up control the counter increments", () => {
        wrapper.find(".controls .up").simulate("click");
        expect(onClick).toHaveBeenCalledWith(1, UP_VOTE);
    });

    it("given I click on the up control the counter descrem", () => {
        wrapper.find(".controls .down").simulate("click");
        expect(onClick).toHaveBeenCalledWith(1, DOWN_VOTE);
    });

    it("given the user voted on the item get a voted class", () => {
        wrapper.setProps({voted: true});
        expect(wrapper.is(".voted")).toEqual(true);
    });
});
