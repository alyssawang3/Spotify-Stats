import React from 'react'

const AUTH_URL = "https://accounts.spotify.com/authorize?client_id=d61f6f58527a4cb290cf8b8ac709c076&response_type=code&redirect_uri=http://localhost:3000/&scope=user-read-email%20user-top-read%20playlist-modify-public"

export const Home = () => {

    return (
      <div className="Title">
          <h1>Spotify <br></br> Stats</h1>
          <p>Get insights into your Spotify listening habits!<br></br>View your statistics about your top artists, songs,<br></br>and genres all in one place.</p>
  
          <div className="login">
            <img className="logo" src="/images/Spotify_Logo_RGB_White.png" alt="Logo" />
            <a href={AUTH_URL}><button className="loginButton">LOGIN WITH SPOTIFY</button></a>
          </div>
  
        </div>
    )
  // }

}