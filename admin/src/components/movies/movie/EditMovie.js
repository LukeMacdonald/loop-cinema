import React, { useState, useEffect } from 'react';
import { findMovieByID, updateMovie } from '../../../database/repository';
import { useNavigate, useParams } from 'react-router-dom';

function EditMovieForm() {
    const { id } = useParams();
    const [formData, setFormData] = useState({
      title: '',
      description: '',
      director: '',
      release_date: '', // Note: Initialize it as an empty string
      poster: '',
      duration: '',
      genre: ''
    });
  
    const navigate = useNavigate();
  
    useEffect(() => {
      async function fetchMovieData() {
        try {
          const movie = await findMovieByID(id);
          // Extract the date part in the format YYYY-MM-DD from the release_date string
          const formattedReleaseDate = movie.release_date ? movie.release_date.split('T')[0] : '';
          setFormData({ ...movie, release_date: formattedReleaseDate });
        } catch (error) {
          console.error('Error fetching movie data:', error);
        }
      }
  
      fetchMovieData();
    }, [id]);
  
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateMovie(id, formData); // Implement this function to update movie data by ID
      navigate('/admin/movies');
    } catch (error) {
      // Handle error, e.g., show an error message to the user
      console.error('Error updating movie:', error);
    }
  };

  return (
    <div className="container mt-5" style={{ width: '40%' }}>
      <h2>Edit Movie</h2>
      <form onSubmit={handleSubmit}>
      <div className="form-group">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            className="form-control"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="director">Director:</label>
          <input
            type="text"
            className="form-control"
            id="director"
            name="director"
            value={formData.director}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="release_date">Release Date:</label>
          <input
            type="date"
            className="form-control"
            id="release_date"
            name="release_date"
            value={formData.release_date}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="poster">Poster URL:</label>
          <input
            type="text"
            className="form-control"
            id="poster"
            name="poster"
            value={formData.poster}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="duration">Duration (minutes):</label>
          <input
            type="number"
            className="form-control"
            id="duration"
            name="duration"
            value={formData.duration}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="genre">Genre:</label>
          <input
            type="text"
            className="form-control"
            id="genre"
            name="genre"
            value={formData.genre}
            onChange={handleInputChange}
            required
          />
        </div>
        <div style={{ textAlign: 'center', marginTop: '4rem' }}>
          <button type="submit" className="btn btn-primary" onClick={handleSubmit} style={{ width: '50%' }}>
            Update
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditMovieForm;