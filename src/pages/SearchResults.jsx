import React from 'react'
import MovieCard from '../components/MovieCard'
import { useLocation } from 'react-router-dom'

function SearchResults(props) {

  //
  const { state } = useLocation();
  //
  const input = state?.input ?? '';
  const results = state?.results ?? [];

  return (
    /*Search results screen */
    <div id="search-results-screen">
      <h6 className="search-results-title">Search results for <em>"{input}" </em>:</h6>
      {results.length > 0 ? <div>
        {results.map((movie, id) =>
          <MovieCard key={id} movie={movie} />)}
      </div> :
        <div>No movies found.</div>}
    </div>
  )
}

export default SearchResults
