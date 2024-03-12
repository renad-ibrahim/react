import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import Home from './Components/Home/Home'
import Login from './Components/Login/Login';
import { ToastContainer } from 'react-toastify';
import Regiseration from './Components/Registeration/Registeration';
import Navbar from './Components/Navbar/Navbar';
import Edit from './Components/Edit/Edit';
import Add from './Components/Add/Add';
import Details from './Components/Details/Details';



function App() {
  return (
    <>
    <ToastContainer theme='colored'></ToastContainer>
      <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/registeration' element={<Regiseration/>}></Route>
        <Route path='/edit/:empid' element={<Edit/>}></Route>
        <Route path='/add' element={<Add/>}></Route>
        <Route path='/details/:empid' element={<Details />}></Route>

      </Routes>
    </BrowserRouter>
    </>
  )
    
}

export default App
