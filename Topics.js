import React, { useEffect } from 'react'
import { Link , useLocation} from "react-router-dom";

import './topics.css';
import SpotifyWebApi from 'spotify-web-api-node';

const spotifyApi = new SpotifyWebApi({
    clientId: "d61f6f58527a4cb290cf8b8ac709c076",
})

export const Topics = ({ token }) => {
    // const accessToken = useAuth(code)
    let accessToken = token

    const location = useLocation();
    if (!accessToken && location.state){
        accessToken =  location.state.token 
    }
    console.log("INSIDE TOPICS token IS", accessToken)
    

    return (
        <div className='Topics'>
            <div className='Header'>
                <h1>Hey username! <br></br> Dive into your</h1>
            </div>

            {/* <button className="tempBtn" onClick={getMeThing}>Get Me</button> */}
            <div className='content'>
                <Link to="/tracks" state={{ token: accessToken }}><button className="button tracksbtn">TOP TRACKS</button></Link>
                <Link to="/artists" state={{ token: accessToken }}><button className="button artistsbtn">TOP ARTISTS</button></Link>
                <Link to="/genres"><button className="button genresbtn">TOP GENRES</button></Link>
            </div>
        </div>
    );
}
