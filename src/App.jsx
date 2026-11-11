import { useState, useEffect } from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min'
import "bootswatch/dist/sandstone/bootstrap.min.css"
import Nav from './components/Nav'

function App() {


    //These have to be fetched here also instead on Popular page to keep info between pages that a movie is in your watchlist
    const [movies, setMovies] = useState([])


    const [loading, setLoading] = useState(true)


    return (
        <>
            <Nav />
        </>
    )
}

export default App
