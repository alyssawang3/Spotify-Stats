import React from 'react'
import { Topics } from './Topics';
import { Home } from './Home';
import useAuth from '../useAuth';

const code = new URLSearchParams(window.location.search).get('code')
// console.error("GETTING CODE IN Base", code)

export function Base() {
  // console.error("CALLING BASE -----")
  const accessToken = useAuth(code)
  return (
    code ?  <Topics token={accessToken}/> :<Home />
  )
}
