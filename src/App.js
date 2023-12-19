import 'primereact/resources/themes/lara-light-indigo/theme.css';   // theme
import 'primereact/resources/primereact.css';                       // core css
import 'primeicons/primeicons.css';                                 // icons
import 'primeflex/primeflex.css';                                     // css utility
import './App.css';
//----------------------------------\\
import Navbar from './layouts/Navbar';
import Home from './pages/Home';
import GenerateInfo from './pages/GenerateInfo'
import GenerateNum from './pages/GenerateNum';
import { Route, Routes } from "react-router-dom";
import Footer from './layouts/Footer';

function App() {
  return (
    <>
      <Navbar />
      <div className='page-container container'>
        <Routes>
          <Route path="/ttrpg-info-gen/">
            <Route index element={<Home />} />
            <Route path="gen-info" element={<GenerateInfo />} />
            <Route path="gen-num" element={<GenerateNum />} />
          </Route>
        </Routes>
      </div>
      <Footer />
    </>
  )
}

export default App;
