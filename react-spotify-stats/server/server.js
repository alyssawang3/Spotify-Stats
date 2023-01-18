const express = require('express');
const SpotifyWebApi = require('spotify-web-api-node');
const bodyParser = require("body-parser")
const cors = require("cors")

const app = express();
app.use(cors())
app.use(bodyParser.json())

// create a route in server to refresh token
app.post('/refresh', (req,res) => {
    const refreshToken = req.body.refreshToken
    console.log("refresh TOKEN",refreshToken)
    const spotifyApi = new SpotifyWebApi({
        // store all the credentials in spotify API
        redirectUri: "http://localhost:3000/",
        clientId: "d61f6f58527a4cb290cf8b8ac709c076",
        clientSecret: "35fd6b84283d4830ae51cb11d439a766",
        refreshToken,
    })
  
    spotifyApi
      .refreshAccessToken()
      .then(data => {
        res.json({
          accessToken: data.body.access_token,
          expiresIn: data.body.expires_in,
        })
      })
      .catch(err => {
        console.log(err)
        res.sendStatus(400)
      })

})


app.post('/login', (req, res) => {
    // pass the code in request body
    console.log("req is", req.body)
    const code = req.body.code
    const spotifyApi = new SpotifyWebApi({
        // store all the credentials in spotify API
        redirectUri: "http://localhost:3000/",
        clientId: "d61f6f58527a4cb290cf8b8ac709c076",
        clientSecret: "35fd6b84283d4830ae51cb11d439a766"
    })

    spotifyApi.authorizationCodeGrant(code).then(data => {
        res.json({
            // this is what we are going to return from our api
            accessToken: data.body.access_token,
            refreshToken: data.body.refresh_token,
            expiresIn: data.body.expires_in
        })
        // console.log("return data", res)
    }).catch(err =>{
        // console.error("Get error ", err)
        res.sendStatus(400)
    })
})

app.listen(3001)