import './artists.css';
import ButtonGroup from "./ButtonGroup";
import { Link, useLocation } from "react-router-dom";
import SpotifyWebApi from 'spotify-web-api-node';
import React, { useEffect, useState } from 'react'

const spotifyApi = new SpotifyWebApi({
    clientId: "d61f6f58527a4cb290cf8b8ac709c076",
})


export const Artists = () => {

    const [artistsResults, setArtistsResults] = useState([])

    const location = useLocation();
    console.log("token get from topics", location)

    useEffect(() => {
        if (!location.state.token) return
        // set access token on our spotify api to use that access token for further queries
        spotifyApi.setAccessToken(location.state.token)
        console.log("In use effect *****")
        getTopArtistsAPI("short_term")

    }, [location.state.token])

    const getTopArtistsAPI = (type) =>{
        spotifyApi.getMyTopArtists({ time_range: type, limit: 50 })
            .then(function (data) {
                let topArtists = data.body.items;
                let index = 1
                console.log("in getMyTopArtists", topArtists);
                setArtistsResults(topArtists.map(artist => {

                    return {
                        artistIndex: index++,
                        artistName: artist.name,
                        artistImg: artist.images[0].url,
                        uri: artist.uri
                    }
                }))
            }, function (err) {
                console.log('Something went wrong!', err);
            });
    }


    const getTopArtists = (event) => {
        console.log("getTopArtist", event)
        let range = "short_term"
        if (event === 1) range = "medium_term"
        if (event === 2) range = "long_term"

        getTopArtistsAPI(range)
    }
    return (
        <div className='Artists'>
            <div className='artist_title'>
                <h1>Top Artists</h1>
            </div>

            <div className='Buttons'>
                <ButtonGroup buttons={["Last Month", "Last 6 Months", "All Time"]}
                    onButtonClick={getTopArtists}
                />
            </div>
            <Link to="/topics"  state={{ token: location.state.token }}>
                <button type="button" className="btn-previous">
                    <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" className="bi bi-chevron-left" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z" />
                    </svg>
                </button>
            </Link>

            <div className='content_images'>
                {
                    artistsResults.map(artist => {
                        return (
                            <div className='box' key={artist.uri}>
                                <img className="artistImg" src={artist.artistImg} />


                                <div className='artistName'>
                                    {artist.artistIndex}. {artist.artistName}

                                    <a href={artist.uri}>
                                        <button className="linkButton">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-box-arrow-up-right" viewBox="0 0 16 16">
                                                <path fillRule="evenodd" d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5z" />
                                                <path fillRule="evenodd" d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0v-5z" />
                                            </svg>
                                        </button>
                                    </a>
                                </div>


                            </div>
                        )
                    })
                }
            </div>

        </div>
    )
}
