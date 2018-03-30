import React from 'react';
import {shallow} from 'enzyme';
import Product from './Product';

describe('Product', () => {
    let wrapper, product;
    beforeEach(() => {
        product = {id: 1, name: "Bose headphones", price: 110};
        wrapper = shallow(<Product {...product}/>);
    });
    it('Given a name of headphones it gets printed', () => {
       wrapper.setProps({name: 'headphones'});
       expect(wrapper.find('.name').text()).toEqual('headphones');
    });
    it('Given a price of 300 it gets printed', () => {
       wrapper.setProps({price: 300});
       expect(wrapper.find('.price').text()).toEqual('300');
    });

    it('Given a likes counter of 160 it gets printed', () => {
       wrapper.setProps({likes: 160});
       expect(wrapper.find('.likes .count').text()).toEqual('160');
    });

    it("Likes controls are displayed", () => {
       expect(wrapper.find('.likes .controls .up').length).toEqual(1);
       expect(wrapper.find('.likes .controls .down').length).toEqual(1);
    });
});