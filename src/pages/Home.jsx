import { useState, useEffect } from "react";
import MovieCard from "../components//MovieCard";
import '../App.css'

const Home = () => {

    const [movies, setMovies] = useState([])

    //Fetches 20 most popular movies from TMDB
    const fetchMovies = async () => {
        const apiKey = import.meta.env.VITE_TMDB_API_KEY
        const url = 'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1';
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${apiKey}`
            }
        };
        const res = await fetch(url, options)
        const data = await res.json()
        setMovies(data.results)
    }

    useEffect(() => {
        //Fetches the movies once
        fetchMovies()
    }, [])

    return (
        /**Home screen */
        <div id='home-screen'>
            <h3>Find where movies available to stream, rent or buy in Finland.</h3>
            <p><em>Watch providers data provided by JustWatch.</em></p>
            <div class="">
                <h5 className="popular-title">Popular movies:</h5>

                {movies.length > 0 ?
                    movies.map((movie, id) =>
                        <div>
                            <MovieCard key={id} movie={movie} />
                        </div>)
                    :
                    <div class="spinner-border" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>}</div>
        </div>
    )
}

export default Home;