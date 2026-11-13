import React from 'react'
import MovieCard from '../components/MovieCard'
import { useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react';

function SearchResults(props) {

  //Uses object destructuring to store the state property of the location object into locationState variable
  const { state: locationState } = useLocation();
  //Initializes the states from what was passed from Search component or ?? initializes the default value
  //? prevents crashing if the state is null or undefined
  const [state, setState] = useState({
    results: locationState?.results ?? [],
    searchInput: locationState?.input ?? "",
    total_pages: locationState?.total_pages ?? 2
  });

  const addResult = (newResults) =>
    setState(prev => ({
       //copies the previous results into a new array
      ...prev,
      //prev?.results prevents crashing if the results is null or undefined
      // ?? [] if the results is null or undefined, falls back to an empty array
      //the srpead ... operations merge the old results array and the newResults array into a single array
      results: [...(prev?.results ?? []), ...newResults],
    }));

  const [page, setPage] = useState(1)

  //Fetch function to search more movies, if there are more than 1 page of results
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

  //runs after loactionState changes
  //Set the states to what was passed from Search components
  //Allows to fetch new results after a new search word is entered
  useEffect(() => {
    setState({
      results: locationState?.results ?? [],
      searchInput: locationState?.input ?? "",
      total_pages: locationState?.total_pages ?? 2,
    })
    //Reset also the page number
    setPage(1)
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
        <button className='btn btn-info' onClick={() => { searchMovies(state.searchInput, page+1) }}>Load more</button>
        : null}
    </div>
  )
}

export default SearchResults
