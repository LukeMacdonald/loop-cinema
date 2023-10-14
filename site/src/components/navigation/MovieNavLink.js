import React from 'react';
import { NavLink } from 'react-router-dom';

const MovieNavLinks = ({ movieID, location }) => (
  <div className='row' style={{marginBottom:'2rem', borderBottom: '1px solid grey', maxWidth:'95%'}}>
    <NavLink 
      to={`/movie/details/${movieID}`} 
      style={{ color: 'white', textDecoration: 'none' }} 
      className={`col-6 nav-item movie-nav-link ${location.pathname === `/movie/details/${movieID}` ? 'movie-active' : ''}`}>
        <div style={{marginTop:'5px'}}>Show Times & Tickets</div>
    </NavLink>
    <NavLink 
      className={`col-6 nav-item movie-nav-link ${location.pathname === `/movie/reviews/${movieID}` ? 'movie-active' : ''}`} 
      to={`/movie/reviews/${movieID}`} 
      style={{ color: 'white', textDecoration: 'none'}}>
        <div style={{marginTop:'5px'}}>Reviews</div>
    </NavLink>
  </div>
);

export default MovieNavLinks;