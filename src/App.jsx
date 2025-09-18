import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddProduct from "./Pages/AddProduct";
import Landing from "./Pages/Landing";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Home from "./Pages/Home";
import Admin from "./Pages/admin";
import Cart from "./Pages/Cart";
import ProfileManage from "./Pages/ProfileManage"; // Import the new component
import ProductManagement from "./Pages/ProductManagement";
import UserProfileManagement from "./Pages/UserProfileManagement";
import ProductDetails from "./Pages/ProductDetails";
import CheckoutPage from "./Pages/CheckoutPage";
import OrderConfirmation from "./Pages/OrderConfirmation";
import OrderTracking from "./Pages/OrderTracking"




function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        
        <Route path="/home" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/add-product" element={<AddProduct />} />
        <Route path="/profile" element={<ProfileManage />} /> {/* Add this new route */}
        <Route path="/manage-products" element={<ProductManagement />} />
        <Route path="/manage-users" element={<UserProfileManagement />} />
        <Route path="/product/:id" element={<ProductDetails />} />
         <Route path="/checkout" element={<CheckoutPage/> } />
        <Route path="/order-confirmation/:orderId" element={<OrderConfirmation />} />
        <Route path="/order-tracking/:orderId" element={<OrderTracking />} />

      </Routes>
    </Router>
  );
}

export default App;