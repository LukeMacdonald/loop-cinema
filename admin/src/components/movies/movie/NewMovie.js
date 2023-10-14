import React, { useState } from 'react';
import { createMovie } from '../../../database/repository';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../Sidebar'

function MovieForm() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    director: '',
    release_date: '',
    poster: '',
    duration: '',
    genre: ''
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    // Handle form submission, for example, send the formData to an API endpoint
    console.log(formData);
    await createMovie(formData)
    // todo: Add Validation
    navigate('/admin/movies');
  };

  return (
    <div className="container-fluid">
    <div className="row">
      <Sidebar />
      <div className="col-md-9 col-sm-8" style={{ margin: '2rem 0' }}>
    <div className="container mt-5" style={{width:'40%'}}>
      <h2>Movie Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            className="form-control"
            id="title"
            maxLength={255}
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            maxLength={600}
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
            maxLength={60}
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
            maxLength={255}
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
            maxLength={40}
            className="form-control"
            id="genre"
            name="genre"
            value={formData.genre}
            onChange={handleInputChange}
            required
          />
        </div>
        <div style={{textAlign:'center', marginTop:'4rem'}}>
        <button type="submit" className="btn btn-primary" style={{width:'50%'}}>Submit</button>

        </div>
        
      </form>
    </div>
    </div>
    </div>
    </div>
  );
}

export default MovieForm;