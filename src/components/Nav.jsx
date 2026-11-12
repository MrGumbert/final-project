import React from 'react'
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom'
import Home from '../pages/Home'
import Search from './Search'
import Details from '../pages/Details'
import SearchResults from '../pages/SearchResults'

function Nav(props) {
  return (
    <>
      <BrowserRouter>
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
          <div className="container-fluid justify-content-center gap-3">
            <div className="collapse navbar-collapse" id="navbarColor04">
              <ul className="navbar-nav me-auto">
                <li className="home-link nav-item">
                  <NavLink to="/">Home</NavLink>
                </li>
              </ul>
              <Search className="search-bar" searchMovies={props.searchMovies}/>
            </div>
          </div>
        </nav>

        {/* Routes */}
        <Routes>
          <Route path="/" element={<Home movies={props.movies}/>} />
          <Route path="/searchResults" element={<SearchResults/>} />
          <Route path="/details/:id" element={<Details/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default Nav
