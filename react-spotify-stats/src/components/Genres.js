import React, { useEffect, useState } from 'react'
import './genres.css';
import ButtonGroup from "./ButtonGroup";
import { Link, useLocation } from "react-router-dom";
import SpotifyWebApi from 'spotify-web-api-node';

const spotifyApi = new SpotifyWebApi({
    clientId: "d61f6f58527a4cb290cf8b8ac709c076",
})

export const Genres = () => {
    const [genres, setGenres] = useState([])

    const location = useLocation();
    console.log("token get from topics", location)

    useEffect(() => {
        if (!location.state.token) return
        // set access token on our spotify api to use that access token for further queries
        spotifyApi.setAccessToken(location.state.token)

        spotifyApi.getMyTopTracks({ time_range: "long_term", limit: 50 })
            .then(function (data) {
                return data.body;
            }).then(function (data) {
                let setOfArtists = new Set();
                data.items.forEach(track => {
                    track.artists.forEach(artist => {
                        setOfArtists.add(artist.id);
                    });
                });
                return setOfArtists;
            }).then(function (setOfArtists) {
                getGenreFromArtists([...setOfArtists]);
            })
    }, [location.state.token])

    // get genres from artists
    const getGenreFromArtists = (artistBatch) => {
        spotifyApi.getArtists(artistBatch)
            .then(function (data) {
                console.log('Artist information', data.body);
                return data.body;
            }).then(function (data) {
                let genreDict = {};
                data.artists.forEach(artist => {
                    genreDict = addToGenreDict(artist.genres, genreDict);
                })
                // create the array of key-value pairs
                var items = Object.keys(genreDict).map(
                    (key) => { return [key, genreDict[key]] }
                );
                //sort the array based on the value
                items.sort(
                    (first, second) => { return second[1] - first[1] }
                );
                // obtain the list of keys in sorted order of the values
                var keys = items.map(
                    (e) => { return e[0] }
                );
                setGenres(keys);
            });
    }

    function addToGenreDict(genre, genreDict) {
        genre.forEach(genre => {
            if (genreDict[genre]) {
                genreDict[genre] += 1;
            } else {
                genreDict[genre] = 1;
            }
        })
        return genreDict;
    }

    console.log("genres", genres)


    return (
        <div>
            <div className='genres_title'>
                <h1>Top Genres</h1>
            </div>
            <div className='genres_content'>
                <li className='genre_item'>
                    <span className='genre_name'>{genres[0]}</span>
                    <div className='genre_rectangles rect1'>
                        1
                    </div>
                </li>
                <li className='genre_item'>
                    <span className='genre_name'>{genres[1]}</span>
                    <div className='genre_rectangles rect2'>
                        2
                    </div>
                </li>
                <li className='genre_item'>
                <span className='genre_name'>{genres[2]}</span>
                    <div className='genre_rectangles rect3'>
                        3
                    </div>
                </li>
                <li className='genre_item'>
                <span className='genre_name'>{genres[3]}</span>
                    <div className='genre_rectangles rect4'>
                        4
                    </div>

                </li>
                <li className='genre_item'>
                <span className='genre_name'>{genres[4]}</span>
                    <div className='genre_rectangles rect5'>
                        5
                    </div>

                </li>
                <li className='genre_item'>
                <span className='genre_name'>{genres[5]}</span>
                    <div className='genre_rectangles rect6'>
                        6
                    </div>

                </li>
                <li className='genre_item'>
                <span className='genre_name'>{genres[6]}</span>
                    <div className='genre_rectangles rect7'>
                        7
                    </div>

                </li>
                <li className='genre_item'>
                <span className='genre_name'>{genres[7]}</span>
                    <div className='genre_rectangles rect8'>
                        8
                    </div>
                </li>
                <li className='genre_item'>
                <span className='genre_name'>{genres[8]}</span>
                    <div className='genre_rectangles rect9'>
                        9
                    </div>
                </li>
                <li className='genre_item'>
                <span className='genre_name'>{genres[9]}</span>
                    <div className='genre_rectangles rect10'>
                        10
                    </div>
                </li>
            </div>





            <Link to="/topics" state={{ token: location.state.token }}>
                <button type="button" className="btn-previous">
                    <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" className="bi bi-chevron-left" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z" />
                    </svg>
                </button>
            </Link>

        </div>
    )
}
