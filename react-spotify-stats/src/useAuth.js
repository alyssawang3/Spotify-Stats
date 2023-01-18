import React, { useEffect, useState } from 'react'
import axios from "axios"

export default function useAuth(code) {
    // store access token, refresh token, and expires in
    const [accessToken, setAccessToken] = useState()
    const [refreshToken, setRefreshToken] = useState()
    const [expiresIn, setExpiresIn] = useState()

    // to get information, use useEffect
    useEffect(() => {
        axios
            .post('http://localhost:3001/login', {
                code,
            }).then(res => {
                // console.error("******* rsp data is", res)
                setAccessToken(res.data.accessToken)
                setRefreshToken(res.data.refreshToken)
                setExpiresIn(res.data.expiresIn)
                window.history.pushState({}, null, "/")
            }).catch(err => {
                // console.error("*******err", err)
                // window.location = "/"
            }
            )
    }, [code])

    useEffect(() => {
        if (!refreshToken || !expiresIn) return
        const interval = setInterval(() => {
            axios
                .post("http://localhost:3001/refresh", {
                    refreshToken,
                })
                .then(res => {
                    setAccessToken(res.data.accessToken)
                    setExpiresIn(res.data.expiresIn)
                })
                .catch(() => {
                    // console.error("GETTING ERORR BACK ")
                    // window.location = "/"
                })
        }, (expiresIn - 60) * 1000)

        return () => clearInterval(interval)
    }, [refreshToken, expiresIn])


    return accessToken
}
