import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./Header/Header";
import Home from "./Home/Home";
import Products from "./Products/Products";
import ProductDetails from "./ProductDetails/ProductDetails";
import Cart from "./Cart/Cart";

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Header />
                <div className="container">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/products" element={<Products />} />
                        <Route
                            path="/products/:productId"
                            element={<ProductDetails />}
                        />
                        <Route
                            path="/categories"
                            element={<div>Categories</div>}
                        />
                        <Route
                            path="categories/:categoryName"
                            element={<div>Category details</div>}
                        />
                        <Route path="/cart" element={<Cart />} />
                        <Route path="/checkout" elemnet={<div>CheckOut</div>} />
                        <Route path="/thanks" element={<div>Thank you</div>} />
                        <Route path="/faq" element={<div>FaQ</div>} />
                        <Route path="/contact" element={<div>Contact</div>} />
                        <Route path="*" element={<div>Not found</div>} />
                    </Routes>
                </div>
            </BrowserRouter>

            <footer className="container">Footer</footer>
        </div>
    );
}

export default App;
