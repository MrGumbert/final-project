import React from 'react'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

const MovieCard = ({ movie, available }) => {

    const [isLoading, setIsLoading] = useState(true)

    const navigate = useNavigate()

    return (
        <div className="card">
            <div className="row g-0">

                <div className="col-md-4">
                    <img
                        src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                        className=" card-img img-fluid rounded-start w-100 h-100 object-fit-cover"
                        alt={movie.title}
                        onClick={() => { navigate(`/details/${movie.id}`, { state: { movie, available } }) }}
                    />
                </div>

                <div className="col-md-8">
                    <div className="card-body">
                        <h5 className="card-title"
                        onClick={() => { navigate(`/details/${movie.id}`, { state: { movie, available } }) }}
                        >{movie.title}</h5>
                        <p className="card-text">
                            <small className="text-body-secondary">Release date: {movie.release_date}</small>
                        </p>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default MovieCard
