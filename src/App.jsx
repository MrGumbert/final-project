import { useState } from 'react'
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom'
import Home from './Home'
import Page2 from './Page2'
import Page3 from './Page3'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';   

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
        {/* Navigation with NavLink for active styling */}
          <nav class="navbar">
            <NavLink class="navbar-nav me-auto mb-2 mb-lg-0" to="/">Home</NavLink>{" "}
            <NavLink class="navbar-nav me-auto mb-2 mb-lg-0" to="/page2">Page2</NavLink>
            <NavLink class="navbar-nav me-auto mb-2 mb-lg-0" to="/page3">Page3</NavLink>
          </nav>

          {/* Routes */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/page2" element={<Page2 />} />
            <Route path="/page3" element={<Page3 />} />
          </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
