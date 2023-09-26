import 'primereact/resources/themes/lara-light-indigo/theme.css';   // theme
import 'primereact/resources/primereact.css';                       // core css
import 'primeicons/primeicons.css';                                 // icons
import 'primeflex/primeflex.css';                                     // css utility
import './App.css';
//----------------------------------\\
import Navbar from './layouts/Navbar';
import Home from './pages/Home';
import GenerateTest from './pages/GenerateTest'
import GenerateNum from './pages/GenerateNum';
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <Navbar />
      <div className='container'>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/gen-test" element={<GenerateTest />} />
          <Route path="/gen-num" element={<GenerateNum />} />
        </Routes>
      </div>
    </>
  )
}

export default App;
