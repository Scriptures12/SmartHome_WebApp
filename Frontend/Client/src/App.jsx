import {Routes, Route} from 'react-router-dom';
import HomePage from './pages/HomePage.jsx';
import About from './pages/About.jsx';
import Login from './pages/Login.jsx';
import SignUp from './pages/SignUp.jsx';
import Profile from './pages/Profile.jsx';
import Header from './components/Header.jsx';


const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/Sign-in" element={<Login />}></Route>
        <Route path="/Sign-up" element={<SignUp />}></Route>
        <Route path="/Profile" element={<Profile />}></Route>
      </Routes>
    </>
  );
}

export default App
