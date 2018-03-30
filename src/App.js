import React, {Component} from 'react';
import './App.css';
import ProductList from './ProductList'

const products = [
    {id: 2, name: "Bose headphones", price: 265, likes: 478},
    {id: 6, name: "Macbook pro", price: 1230, likes: 331},
    {id: 8, name: "Running shoes", price: 125, likes: 99},
];

class App extends Component {
    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <h1 className="App-title">Optimistic UI updates</h1>
                </header>
                <ProductList products={products}/>
            </div>
        );
    }
}

export default App;
