import React, { useEffect, useState } from 'react'
import './tracks.css';
import ButtonGroup from "./ButtonGroup";
import { Link, useLocation } from "react-router-dom";
import SpotifyWebApi from 'spotify-web-api-node';

const spotifyApi = new SpotifyWebApi({
    clientId: "d61f6f58527a4cb290cf8b8ac709c076",
})


export const Tracks = () => {
    const [tracksResults, setTracksResults] = useState([])

    const location = useLocation();
    console.log("token get from topics", location)

    useEffect(() => {
        if (!location.state.token) return
        spotifyApi.setAccessToken(location.state.token)

        spotifyApi.getMyTopTracks({ time_range: "short_term", limit: 50 })
            .then(function (data) {
                let topTracks = data.body.items;
                let counter = 1
                console.log(topTracks);
                setTracksResults(topTracks.map(track => {

                    return {
                        trackIndex: counter++,
                        trackName: track.name,
                        trackImg: track.album.images[1].url,
                        artistName: getArtistName(track.artists),
                        url: track.external_urls.spotify,
                        trackId: track.id
                    }
                }))
            }, function (err) {
                console.log('Something went wrong!', err);
            });

    }, [location.state.token])


    const getTopTracks = (event) => {
        let range = "short_term"
        if (event === 1) range = "medium_term"
        if (event === 2) range = "long_term"

        spotifyApi.getMyTopTracks({ time_range: range, limit: 50 })
            .then(function (data) {
                let topTracks = data.body.items;
                let counter = 1
                console.log(topTracks);
                setTracksResults(topTracks.map(track => {
                    return {
                        trackIndex: counter++,
                        trackName: track.name,
                        trackImg: track.album.images[1].url,
                        artistName: getArtistName(track.artists),
                        url: track.external_urls.spotify,
                        trackId: track.id
                    }
                }))
            }, function (err) {
                console.log('Something went wrong!', err);
            });

    }

    const getArtistName = (nameArray) => {
        let names = ""
        for (let i = 0; i < nameArray.length; i++) {
            if (i > 0) names += ", "
            names += nameArray[i].name
        }
        return names
    }

    return (
        <div className='Tracks'>
            <div className='tracks_title'>
                <h1>Top Tracks</h1>
            </div>

            <div className='Buttons'>
                <ButtonGroup buttons={["Last Month", "Last 6 Months", "All Time"]}
                    onButtonClick={getTopTracks}
                />
            </div>
            <Link to="/topics" state={{ token: location.state.token }}>
                <button type="button" className="btn-previous">
                    <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" className="bi bi-chevron-left" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z" />
                    </svg>
                </button>
            </Link>

            <div className='tracks_container'>
                {
                    tracksResults.map(track => {
                        return (
                            <div className='rectangle' key={track.url}>
                                <div className='listOrder'>
                                    {track.trackIndex}
                                </div>
                                <img className="trackImg" src={track.trackImg} />
                                <div className='trackName'>
                                    {track.trackName}

                                    <a href={track.url}>
                                        <button className="urlButton">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-box-arrow-up-right" viewBox="0 0 16 16">
                                                <path fillRule="evenodd" d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5z" />
                                                <path fillRule="evenodd" d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0v-5z" />
                                            </svg>
                                        </button>
                                    </a>
                                </div>

                                <div className='artist'>
                                    {track.artistName}
                                </div>


                            </div>
                        )
                    })
                }
            </div>
        </div>


    )
}
