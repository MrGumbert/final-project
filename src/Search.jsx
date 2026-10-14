import { useState, useEffect } from 'react'
import { FaSearch } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import './App.css'

const Search = () => {

    const [input, setInput] = useState('')
    const [results, setResults] = useState([])
    const [availability, setAvailability] = useState()

    const navigate = useNavigate();

    const searchMovies = async (value) => {
        const apiKey = import.meta.env.VITE_TMDB_API_KEY
        const url = `https://api.themoviedb.org/3/search/movie?query=${value}&include_adult=false&language=en-US&page=1`;
        const options = {
            method: 'GET',
            headers: { accept: 'application/json', Authorization: `Bearer ${apiKey}` }
        };

        const res = await fetch(url, options)
        const data = await res.json()
        setResults(data.results)

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

    const handleTextChange = (e) => {
        setInput(e.target.value)
    }

    useEffect(() => {
        if (!availability) {
            return
        } else {
            navigate("/searchResults", { state: { results, availability } })
        }
    }, [availability])

    return (
        <div class="d-flex align-items-center">
            <FaSearch size={30} />
            <input class="form-control me-2" type="input" placeholder="...type movie to search" aria-label="Search" value={input} onChange={handleTextChange} />
            <button class="btn btn-outline-success" type="submit" onClick={() => searchMovies(input)}>Search</button>
        </div>
    )
}

export default Search
