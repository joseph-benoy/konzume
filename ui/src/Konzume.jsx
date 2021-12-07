import Dash from "./Pages/Dash/Dash";
import Login from "./Pages/Login/Login";
import Register from "./Pages/register/Register";
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom';
import Home from "./Pages/Home/Home";
import About from "./Pages/About/About";
import Contact from "./Pages/Contact/Contact";

const Konzume = ()=>{
    return(
        <Router>
            <Routes>
                <Route exact path="/" element={<Home/>}></Route>
                <Route exact path="/home" element={<Home/>}></Route>
                <Route exact path="/about" element={<About/>}></Route>
                <Route exact path="/contact" element={<Contact/>}></Route>
                <Route exact path="/login" element={<Login/>}></Route>
                <Route exact path="/signup" element={<Register/>}></Route>
                <Route  path="/dashboard/*" element={<Dash/>}></Route>
            </Routes>
        </Router>
    );
}

export default Konzume;