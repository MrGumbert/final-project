import React from 'react'
import MovieCard from '../components/MovieCard'
import { useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react';

function SearchResults(props) {

  const { state: locationState } = useLocation();
  const [state, setState] = useState({
    results: locationState?.results ?? [],
    searchInput: locationState?.input ?? "",
    total_pages: locationState?.total_pages ?? 2
  });

  const addResult = (newItem) =>
    setState(prev => ({
      ...prev,
      results: [...(prev?.results ?? []), ...newItem],
    }));

  const [page, setPage] = useState(2)

  const searchMovies = async (input, page) => {
    const apiKey = import.meta.env.VITE_TMDB_API_KEY
    const url = `https://api.themoviedb.org/3/search/movie?query=${input}&include_adult=false&language=en-US&page=${page}`;
    const options = {
      method: 'GET',
      headers: { accept: 'application/json', Authorization: `Bearer ${apiKey}` }
    };

    const res = await fetch(url, options)
    const data = await res.json()
    addResult(data.results)
    setPage(page + 1)
  }

  useEffect(() => {
    setState({
      results: locationState?.results ?? [],
      searchInput: locationState?.input ?? "",
      total_pages: locationState?.total_pages ?? 2,
    })
    setPage(2)
  }, [locationState])


  return (
    /*Search results screen */
    <div id="search-results-screen">
      <h6 className="search-results-title">Search results for <em>"{state.searchInput}" </em>:</h6>
      {state.results.length > 0 ? <div>
        {state.results.map((movie, id) =>
          <MovieCard key={id} movie={movie} />)}
      </div> :
        <div>No movies found.</div>}
      {page < state.total_pages ?
        <button className='btn btn-info' onClick={() => { searchMovies(state.searchInput, page) }}>Load more</button>
        : null}
    </div>
  )
}

export default SearchResults
