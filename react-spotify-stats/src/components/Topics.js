import React, { useEffect, useState } from 'react'
import { Link , useLocation} from "react-router-dom";

import './topics.css';
import SpotifyWebApi from 'spotify-web-api-node';

const spotifyApi = new SpotifyWebApi({
    clientId: "d61f6f58527a4cb290cf8b8ac709c076",
})

export const Topics = ({ token }) => {
    const [user, setUser] = useState([])
    let accessToken = token

    const location = useLocation();
    if (!accessToken && location.state){
        accessToken =  location.state.token 
    }
    console.log("INSIDE TOPICS token IS", accessToken)
    spotifyApi.setAccessToken(accessToken)

    const getUser = 
        spotifyApi.getMe()
        .then(function(data) {
            console.log('Some information about the authenticated user', data.body.display_name);
            let userName = data.body.display_name;
            setUser(
                userName
            )
        }, function(err) {
            console.log('Something went wrong!', err);
        });

    function logout(e) {
        const url = 'https://www.spotify.com/logout/'                                                                                                                                                                                                                                                                               
        const spotifyLogoutWindow = window.open(url, 'Spotify Logout', 'width=700,height=500,top=40,left=40')                                                                                                
        setTimeout(() => {spotifyLogoutWindow.close();
            window.location.href="/";}, 1000)
        
    } 
    return (
        <div className='Topics'>
            <button className='logoutbtn' onClick={logout}>Log Out</button>
            <div className='Header'>
                <h1>Hey {user}!<br></br>Dive into your</h1>
            </div>
            <div className='content'>
                <Link to="/tracks" state={{ token: accessToken }}><button className="button tracksbtn">TOP TRACKS</button></Link>
                <Link to="/artists" state={{ token: accessToken }}><button className="button artistsbtn">TOP ARTISTS</button></Link>
                <Link to="/genres" state={{ token: accessToken }}><button className="button genresbtn">TOP GENRES</button></Link>
            </div>
        </div>
    );
}
