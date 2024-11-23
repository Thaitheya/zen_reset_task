import './App.css'
import { Route, Routes } from 'react-router-dom'
import  Login  from './pages/Login'
import  Signup  from "./pages/Signup";
import  Home  from "./pages/Home";
import Reset from './pages/Reset';
function App() {
  return (
    <>
      <div>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path='/Reset' element={<Reset/>} />
          <Route path="/home" element={<Home />} />
          <Route path="*" element={"NotFound"} />
        </Routes>
      </div>
    </>
  );
}

export default App
