

import './index.css'
import Navbar from './components/navbar'
import Footer from './components/footer'
import { Outlet } from 'react-router';
// import HeroSection from './components/HeroSection';
// import { Outlet } from 'react-router';


function App() {
  return (
    <>

      <Navbar/>
      {/* <HeroSection/> */}
      <Outlet/>
      <Footer/>
      
    </>
  )
}

export default App;
