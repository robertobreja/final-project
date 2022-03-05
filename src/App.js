import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './Header/Header';
import Home from './Home/Home';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/products' element={<div>Products</div>} />
        <Route path='/products/:productId' element={<div>Product details</div>} />
        <Route path='/categories' element={<div>Categories</div>} />
        <Route path='categories/:categoryName' element={<div>Category details</div>} />
        <Route path='/cart' element={<div>Cart</div>} />
        <Route path='/checkout' elemnet={<div>CheckOut</div>} />
        <Route path='/thanks' element={<div>Thank you</div>} />
        <Route path='/faq' element={<div>FaQ</div>} />
        <Route path='/contact' element={<div>Contact</div>} />
        <Route path='*' element={<div>Not found</div>} />
      </Routes>
      </BrowserRouter>

      <footer>Footer</footer>
    </div>
  );
}

export default App;
