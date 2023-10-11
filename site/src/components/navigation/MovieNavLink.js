import React from 'react';
import { NavLink } from 'react-router-dom';

const MovieNavLinks = ({ movieID, location }) => (
  <div className='row'>
    <div className={`col-6 nav-item movie-nav-link ${location.pathname === `/movie/details/${movieID}` ? 'movie-active' : ''}`}>
      <NavLink to={`/movie/details/${movieID}`} style={{ color: 'white', textDecoration: 'none' }}>Show Times & Tickets</NavLink>
    </div>
    <div className={`col-6 nav-item movie-nav-link ${location.pathname === `/movie/reviews/${movieID}` ? 'movie-active' : ''}`}>
      <NavLink to={`/movie/reviews/${movieID}`} style={{ color: 'white', textDecoration: 'none' }}>Reviews</NavLink>
    </div>
  </div>
);

export default MovieNavLinks;