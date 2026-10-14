import { useState } from 'react'
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom'
import Popular from './Popular'
import Search from './Search'
import Page3 from './Page3'
import Home from './Home'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';   
import SearchResults from './SearchResults'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
        {/* Navigation with NavLink for active styling */}
          <nav class="navbar bg-body-tertiary">
            <div class="container-fluid justify-content-center gap-3">
            <NavLink class="" to="/">Home</NavLink>
            <NavLink class="" to="/popular">Popular</NavLink>
            <NavLink class="mr-5" to="/page3">Page3</NavLink>
            <Search/>
            </div>
          </nav>

          {/* Routes */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/popular" element={<Popular />} />
            <Route path="/page3" element={<Page3 />} />
            <Route path="/searchResults" element={<SearchResults/>}/>
          </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
