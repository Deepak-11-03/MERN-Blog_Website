import './App.css';
import {Route,Routes} from 'react-router-dom'
import Home from './Components/Home'
import Header from './Components/HeaderComponent/Header';
import Signup from './Components/HeaderComponent/Signup';
import Login from './Components/HeaderComponent/Login';
import Protected from './Components/Protected';
import Blogupload from './Components/Blogupload';
import UserBlog from './Components/UserBlog';


function App() {
  return (
    <div className="App">
     <Header/>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route  exact path="/signup" element={<Signup />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path ='/addblog' element={<Protected Component={Blogupload}/>}/>
        <Route exact path ='/blogs' element={<Protected Component={UserBlog}/>}/>
        <Route path='*' element={<Home/>} />
      </Routes>
    </div>
  );
}

export default App;
