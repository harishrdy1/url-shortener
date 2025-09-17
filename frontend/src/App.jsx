import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home/Home';
import LoginPage from './Pages/LoginPage/LoginPage';
import './index.css';
import PrivateRoute from './Components/PrivateRoute/PrivateRoute';
import { HeaderMegaMenu } from './Components/Navbar/HeaderMegaMenu';
import Profile from './Pages/profile';
import UrlShortener from './Pages/UrlShortener';
import Myurls from './Pages/MyUrls';


function App() {
  return (
    <Router>
        <HeaderMegaMenu/>
        <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/login' element={<LoginPage/>} />
            <Route element={<PrivateRoute/>}>
             <Route path='/profile' element={<Profile/>}/>
             <Route path='/urlshortener'element={<UrlShortener/>}/>
             <Route path='/MyUrls'element={<Myurls/>}/>



            </Route>
        </Routes>
    </Router>
  )
}

export default App
