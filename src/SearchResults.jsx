import React from 'react'
import MovieCard from './MovieCard'
import { useLocation } from 'react-router-dom'

function SearchResults() {

  const { state } = useLocation();
  const results = state?.results ?? [];
  const availability = state?.availability ?? [];

  return (
    <div>
      {results.length > 0 ? <div>
        {results.map((movie, id)=>
        <MovieCard key={id} movie={movie} available={availability[id]}/>)}
      </div>:
      <div>No movies found.</div>}
    </div>
  )
}

export default SearchResults
