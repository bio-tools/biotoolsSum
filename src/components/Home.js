import React from 'react'
import {Jumbotron} from 'react-bootstrap'
import {Link} from 'react-router-dom'

const Home = () => (
  <Jumbotron>
    <h1>Hello!</h1>
    <p>This is a simple services app for Elixir CZ, for more information about our services click the link below.</p>
    <p><Link to='/services'>Services</Link></p>
  </Jumbotron>
)

export default Home
