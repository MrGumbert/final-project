import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useParams } from "react-router-dom";
import '../App.css'

function Details(props) {

    const [details, setDetails] = useState("")
    const [availability, setAvailability] = useState("")

    const { state } = useLocation()
    const movie = state?.movie ?? ""


    const { id } = useParams();

    const fetchDetails = async (id) => {
        const apiKey = import.meta.env.VITE_TMDB_API_KEY
        const url = `https://api.themoviedb.org/3/movie/${id}?language=en-US`;
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

    const fetchAvailability = async (id) => {
        const apiKey = import.meta.env.VITE_TMDB_API_KEY
        const url = `https://api.themoviedb.org/3/movie/${id}/watch/providers`
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${apiKey}`
            }
        };
        const res = await fetch(url, options)
        const data = await res.json()
        if (data.results.FI != null) {
            setAvailability(data.results.FI)
        }
        else {
            setAvailability('Not available')
        }
    }

    useEffect(() => {
        if (movie == "") {
            fetchDetails(id)
            fetchAvailability(id)
        } else {
            fetchDetails(movie.id)
            fetchAvailability(movie.id)
        }
    }, [])


    const stream =
        availability && (
            availability.flatrate && (
                availability.flatrate.map((provider, i) =>
                    <li>
                        <span className="provider-name">{provider.provider_name}</span>
                        <img className="company-logo" src={`https://image.tmdb.org/t/p/original${provider.logo_path}`} /></li>))
        )

    const rent =
        availability && (
            availability.rent && (
                availability.rent.map((provider, i) =>
                    <li>
                        <span className="provider-name">{provider.provider_name}</span>
                        <img className="company-logo" src={`https://image.tmdb.org/t/p/original${provider.logo_path}`} /></li>))
        )

    const buy =
        availability && (
            availability.buy && (
                availability.buy.map((provider, i) =>
                    <li>
                        <span className="provider-name">{provider.provider_name}</span>
                        <img className="company-logo" src={`https://image.tmdb.org/t/p/original${provider.logo_path}`} /></li>))
        )

    return (
        <div id="details-screen">
            {details != "" && availability != "" ?

                <div className="details-card">
                    <div className="row g-0">

                        <div className="col-md-4">
                            <img
                                src={`https://image.tmdb.org/t/p/original${details.poster_path}`}
                                className="details-card-img img-fluid rounded-start w-100 h-100 object-fit-cover"
                                alt={details.title}
                            />
                        </div>

                        <div className="col-md-8">
                            <div className="details-card-body">
                                <h5 className="details-card-title underline">{details.title}</h5>
                                <p className="details-card-text">
                                    <small className="details-release-date text-body-secondary">Release date: {details.release_date}</small>
                                </p>
                                <div className='col-md-12'>
                                    <p>
                                        <small className="details-runtime text-body-secondary">Runtime: {details.runtime} min</small>
                                    </p>
                                </div>

                                <div className='col-md-12'>
                                    {details.genres.map((genre, id) =>
                                        <span key={id} className="details-genre text-body-secondary"><small> • {genre.name}</small></span>
                                    )}
                                </div>

                                <div className='row'>
                                    <div className='col-md-12'>
                                        <br />
                                        <small className=" details-tagline text-body-secondary"><p><em>{details.tagline}</em></p></small>
                                    </div>
                                    <div className='details-overview col-md-12'>
                                        <p>{details.overview}</p>
                                    </div>

                                    <div className='col-md-12'>
                                        <h6 className="where-to-see">Where to see: <em className='text-body-secondary'>(Watch providers data provided by JustWatch.)</em></h6>
                                    </div>

                                    {availability && (
                                        <>
                                            <div className='col-md-3'>
                                                {stream ? (
                                                    <div>
                                                        <h5 className="stream">Stream at:</h5>
                                                        <ul className="stream-list">{stream}</ul>
                                                    </div>
                                                ) : <p>Not available to stream</p>}
                                            </div>

                                            <div className='col-md-3'>
                                                {rent ? (
                                                    <div>
                                                        <h5 className="rent">Rent at:</h5>
                                                        <ul className="rent-list">{rent}</ul>
                                                    </div>
                                                ) : <p>Not available to rent</p>}
                                            </div>

                                            <div className='col-md-3'>
                                                {buy ? (
                                                    <div>
                                                        <h5 className="buy">Buy at:</h5>
                                                        <ul className="buy-list">{buy}</ul>
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
