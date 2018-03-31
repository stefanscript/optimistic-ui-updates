import React, {Component} from "react";
import "./App.css";
import ProductList from "./ProductList";

class App extends Component {
    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <h1 className="App-title">Optimistic UI updates</h1>
                </header>
                <ProductList />
            </div>
        );
    }
}

export default App;
