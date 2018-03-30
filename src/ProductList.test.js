import React from 'react';
import ProductList from './ProductList';
import {shallow} from 'enzyme';
import Product from "./Product";

describe("ProductList", () => {
    const oneProduct = [{id: 2, name: "bose headphones", price: 265}];
    const twoProducts = [...oneProduct, {id:7, name: "macbook pro", price: 1200}];

    it("Given a list with 0 products, no product gets displayed", ()=> {
        const wrapper = shallow(<ProductList />);
        expect(wrapper.find(Product).length).toEqual(0);
    });

    it("Given a list with 1 product, the product gets displayed", ()=> {
       const wrapper = shallow(<ProductList products={oneProduct}/>);
       expect(wrapper.find(Product).length).toEqual(1);
    });

    it("Given a list with 2 products, the product gets displayed", ()=> {
       const wrapper = shallow(<ProductList products={twoProducts}/>);
       expect(wrapper.find(Product).length).toEqual(2);
    });
});
