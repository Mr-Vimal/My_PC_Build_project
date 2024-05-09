import { Routes , Route} from 'react-router-dom'
import Home from '../Pages/Home/Home';
import About from '../Pages/About/About'
import Products from '../Pages/Products/Product'
import Contact from '../Pages/Contact/Contact'
import Login from '../Components/Form/Login/login';
import SignUp from '../Components/Form/SignUp/Signup';
import Quote from '../Pages/Quotation/Quote';

export default function RouteTable() {
  return (
    <div >
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/products' element={<Products/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/contact' element={<Contact/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<SignUp/>}/>
        <Route path='/customBuild' element={<Quote/>}/>
      </Routes>
    </div>
  );
}

