import {shallow} from "enzyme";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import ProductList from "./ProductList";

it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
});

it("renders the products list", () => {
    const app = shallow(<App />);
    expect(app.find(ProductList).length).toEqual(1);
});

