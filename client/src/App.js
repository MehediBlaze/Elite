import Home from './pages/Home';
import ProductList from './pages/ProductList';
import Product from './pages/Product';
import Register from './pages/Register';
import Login from './pages/Login';
import Cart from './pages/Cart';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Success from './pages/Success';
import Address from './pages/Address';
import { useSelector } from 'react-redux';

function App() {
  const user = useSelector((state) => state.user);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products/:category" element={<ProductList />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={user.current ? <Navigate to="/" /> : <Login />} />
        <Route path="/register" element={user.current ? <Navigate to="/" /> : <Register />} />
        <Route path="/success" element={<Success />} />
        <Route path="/address" element={<Address />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
