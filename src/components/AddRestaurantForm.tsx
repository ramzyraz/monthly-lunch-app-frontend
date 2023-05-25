import { useState, ChangeEvent, FormEvent } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import axios from 'axios';

const AddRestaurantForm = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [url, setUrl] = useState('');
  const [error, setError] = useState('');
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/placesToVisit', { name, description, rating: 0.0, url }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      if (response && response.status === 201) {
        navigate('/tovisit');  
      } else {
        setError(response.data.error);
      }
    } catch (error: any) {
      console.log('Error adding restaurant:', error);
      // if (error.response && error.response.status === 401) {
      //   localStorage.removeItem('token');
      //   localStorage.removeItem('pollExist');
      //   setError('Token has expired. Login again');
      //   setTimeout(() => navigate('/login'), 2000);
      // } else {
        setError('Error adding restaurant');
      // }
    }
  };

  const formContent = () => {
    return (
      <section className="section-add"> 
        <div className="add-restaurant-form">
          <h1>Add a New Restaurant</h1>
          <form onSubmit={handleSubmit}>
            <input 
              type="text" 
              value={name} 
              onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
              placeholder='Enter Restaurant Name'
              required 
            />
            <input 
              type="text" 
              value={description} 
              onChange={(e: ChangeEvent<HTMLInputElement>) => setDescription(e.target.value)}
              placeholder='Enter Restaurant Description (Type of Cuisine)'
              required 
            />
            <input 
              type="text" 
              value={url} 
              onChange={(e: ChangeEvent<HTMLInputElement>) => setUrl(e.target.value)}
              placeholder='Enter Restaurant Website URL'
              required 
            />
            <button type="submit">Submit</button>
            {error && <p className="error-msg">{error}</p>}
          </form>
        </div>
        <div className="back-div">
          <button onClick={() => navigate('/tovisit')} className="back-button">Go Back to Non Visited</button>
          <button onClick={() => navigate('/')} className="back-button-home">Go Back to Home</button>
        </div>
      </section>
    )
  }

  return token ? formContent() : <Navigate to="/login" />;
};

export default AddRestaurantForm;
