import { Routes, Route } from "react-router-dom";
import Home from "../Pages/Home/Home";
import About from "../Pages/About/About";
import Products from "../Pages/Products/Product";
import Contact from "../Pages/Contact/Contact";
import Login from "../Components/Form/Login/login";
import SignUp from "../Components/Form/SignUp/Signup";
import Quote from "../Pages/Quotation/Quote";
import Admin from "../Admin/Admin";
import UserProfile from "../Pages/User/User";
import AccountSetting from "../Pages/User/AccountSetting";
import PasswordChange from "../Pages/User/Password";
import Info from "../Pages/User/Info";
import UserAdd from "../Admin/UserAdd/UserAdd";
import DataShowing from "../Admin/ProductDataShowing";
// import Cart from "../Components/AddTo Cart/Cart";
import Payment from "../Pages/Payment/Payment";
import Details from "../Pages/Products/Details";
import Cart from "../Components/AddTo Cart/Cart";
import ProductDetails from "../Components/AddTo Cart/Cart";
import Card from "../Components/Card/Card";
import "@fortawesome/fontawesome-svg-core";
import "@fortawesome/react-fontawesome";
import Dropdown from "../Pages/Quotation/Quote";
import CheckoutForm from "../Pages/Checkout/CheckoutForm";
import Navbar from "../Components/Navbar/Navbar";

export default function RouteTable() {
  return (
    <div>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/customBuild" element={<Quote />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/accountsetting" element={<AccountSetting />} />
        <Route path="/userprofile" element={<UserProfile />} />
        <Route path="/passwordchange" element={<PasswordChange />} />
        <Route path="/info" element={<Info />} />
        <Route path="/useradd" element={<UserAdd />} />
        <Route path="/datashowing" element={<DataShowing />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/details" element={<Details />} />
        {/* <Route path="/cart" element={<Cart />} /> */}
        <Route path="/cart" element={<Cart />} />
        <Route path="/" element={<Card />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/dropdown" element={<Dropdown />} />
        <Route path="/checkout" element={<CheckoutForm />} />
      </Routes>
    </div>
  );
}
