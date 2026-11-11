import React from 'react'
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom'
import Popular from '../pages/Popular'
import Search from './Search'
import Details from '../pages/Details'
import SearchResults from '../pages/SearchResults'


function Nav(props) {
  return (
    <>
      <BrowserRouter>
        <nav class="navbar navbar-expand-lg bg-body-tertiary">
          <div class="container-fluid justify-content-center gap-3">
            <div class="collapse navbar-collapse" id="navbarColor04">
              <ul class="navbar-nav me-auto">
                <li class="home-link nav-item">
                  <NavLink to="/">Home</NavLink>
                </li>
              </ul>
              <Search class="search-bar" searchMovies={props.searchMovies} availability={props.availability}/>
            </div>
          </div>
        </nav>

        {/* Routes */}
        <Routes>
          <Route path="/" element={<Popular movies={props.movies} availability={props.availability}/>} />
          <Route path="/searchResults" element={<SearchResults/>} />
          <Route path="/details" element={<Details/>} />
        </Routes>
      </BrowserRouter>
    </>

  )
}

export default Nav
