import React from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

const MovieCard = ({ movie, available }) => {

    const stream =
        available.available.flatrate && (
            available.available.flatrate.map((provider, i) =>
                <li>{provider.provider_name}</li>))


    const rent =
        available.available.rent && (
            available.available.rent.map((provider, i) =>
                <li>{provider.provider_name}</li>))


    const buy =
        available.available.buy && (
            available.available.buy.map((provider, i) =>
                <li>{provider.provider_name}</li>))

    return (

        <div class="card mb-5">
            <div class="row">
                <div class="col-md-4">
                    <img id="movie-poster" src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} class="card-img" alt={movie.title} />
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                        <h5 class="card-title">{movie.title}</h5>
                        <p class="card-text"><small class="text-body-secondary">Release date: {movie.release_date}</small></p>
                        <div class="row">
                            <div class="col">
                                {stream ?
                                    <div class="">
                                        <h5>Stream at:</h5>
                                        <ul>{stream}</ul>
                                    </div>
                                    : <p class="">Not available to stream</p>}
                            </div>

                            <div class="col">
                                {rent ? <div class="">
                                    <h5>Rent at:</h5>
                                    <ul>{rent}</ul>
                                </div> : <p>Not available to rent</p>}
                            </div>

                            <div class="col">
                                {buy ? <div class="">
                                    <h5>Buy at:</h5>
                                    <ul>{buy}</ul>
                                </div> : <p>Not available to buy</p>}
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default MovieCard
