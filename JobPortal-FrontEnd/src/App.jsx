import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import './App.css'
import { Register } from './components/Auth/Auth';

function App() {
  

  return (
    <>
      <BrowserRouter>
          <Routes>
            {/* <Route path='/' element={<Home/>}/> */}
            <Route path='/register' element={<Register/>}/>
          </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
