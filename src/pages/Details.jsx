import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import '../App.css'

function Details(props) {

    const [details, setDetails] = useState("");

    const fetchDetails = async () => {
        const apiKey = import.meta.env.VITE_TMDB_API_KEY
        const url = `https://api.themoviedb.org/3/movie/${movie.id}?language=en-US`;
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${apiKey}`
            }
        };
        const res = await fetch(url, options)
        const data = await res.json()
        setDetails(data)
    }

    useEffect(() => {
        fetchDetails()
    }, [])


    const { state } = useLocation()
    const movie = state?.movie ?? ""
    const available = state?.available ?? []

    const stream =
        available && (
            available.available.flatrate && (
                available.available.flatrate.map((provider, i) =>
                    <li>{provider.provider_name}</li>))
        )

    const rent =
        available && (
            available.available.rent && (
                available.available.rent.map((provider, i) =>
                    <li>{provider.provider_name}</li>))
        )

    const buy =
        available && (
            available.available.buy && (
                available.available.buy.map((provider, i) =>
                    <li>{provider.provider_name}</li>))
        )


    return (
        <div>
            {details != "" ?

                <div className="details-card">
                    <div className="row g-0">

                        <div className="col-md-4">
                            <img
                                src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                                className="details-card-img img-fluid rounded-start w-100 h-100 object-fit-cover"
                                alt={movie.title}
                            />
                        </div>

                        <div className="col-md-8">
                            <div className="details-card-body">
                                <h5 className="details-card-title underline">{movie.title}</h5>
                                <p className="details-card-text">
                                    <small className="details-release-date text-body-secondary">Release date: {movie.release_date}</small>
                                </p>
                                <div className='col-md-12'>
                                    <p>
                                        <small className="details-runtime text-body-secondary">Runtime: {details.runtime} min</small>
                                    </p>
                                </div>

                                <div className='col-md-12'>
                                    {details.genres.map((genre, id) =>
                                        <span className="details-genre text-body-secondary"><small> • {genre.name}</small></span>
                                    )}
                                </div>

                                <div className='row'>
                                    <div className='col-md-12'>
                                        <br />
                                        <small className=" details-tagline text-body-secondary"><p><em>{details.tagline}</em></p></small>
                                    </div>
                                    <div className='details-overview col-md-12'>
                                        <p>{movie.overview}</p>
                                    </div>

                                    <div className='col-md-12'>
                                        <h6 className="where-to-see">Where to see: <em className='text-body-secondary'>(Watch providers data provided by JustWatch.)</em></h6>
                                    </div>

                                    {available && (
                                        <>
                                            <div className='col-md-3'>
                                                {stream ? (
                                                    <div>
                                                        <h5 className="stream">Stream at:</h5>
                                                        <ul>{stream}</ul>
                                                    </div>
                                                ) : <p>Not available to stream</p>}
                                            </div>

                                            <div className='col-md-3'>
                                                {rent ? (
                                                    <div>
                                                        <h5 className="rent">Rent at:</h5>
                                                        <ul>{rent}</ul>
                                                    </div>
                                                ) : <p>Not available to rent</p>}
                                            </div>

                                            <div className='col-md-3'>
                                                {buy ? (
                                                    <div>
                                                        <h5 className="buy">Buy at:</h5>
                                                        <ul>{buy}</ul>
                                                    </div>
                                                ) : <p>Not available to buy</p>}
                                            </div>
                                        </>)}
                                </div>

                            </div>
                        </div>

                    </div>
                </div>



                : <div class="spinner-border" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>}
        </div>

    )

}

export default Details
