import { useState, useEffect } from "react";
import MovieCard from "./MovieCard";
import './App.css'

const Popular = () => {

    const [movies, setMovies] = useState([])
    const [availability, setAvailability] = useState([])

    const apiKey = import.meta.env.VITE_TMDB_API_KEY

    const fetchMovies = async () => {
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

        const avail = await Promise.all(
            data.results.map(async (movie) => {
                const res2 = await fetch(
                    `https://api.themoviedb.org/3/movie/${movie.id}/watch/providers`,
                    options
                );
                return await res2.json();
            })
        )
        let ava = []
        for (const i in avail) {
            if (avail[i].results.FI != null) {
                ava.push({ id: avail[i].id, available: avail[i].results.FI })
            } else {
                ava.push({ id: avail[i].id, available: 'Not available' })
            }
        }
        setAvailability(ava)
    }

    useEffect(() => {
        fetchMovies()
    }, [])

    useEffect(() => {

    }, [availability])

    return (
        <>
            <div id='popular-screen'>
                <div id="title"><h3>Popular movies (and where to see them)</h3></div>
                <div class="">{availability.length > 0 ?
                    movies.map((movie, id) =>
                        <div>
                            <MovieCard key={id} movie={movie} available={availability[id]} />
                        </div>)
                    :
                    <div class="spinner-border" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>}</div>
            </div>
        </>
    )
}

export default Popular;