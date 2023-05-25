import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RatingModal from './RatingModal';
import DummyImg from '../assets/dummy.jpg';
import axios from 'axios';

type RatingsType = {
    rating: number,
    userId: string,
}

type VisitedProps = {
    _id: string,
    name: string,
    description: string,
    rating: number,
    ratings: RatingsType[],
    url: string
}

type Props = {
    visited: VisitedProps[],
    setRatingUpdated: (ratingUpdated: boolean) => void
}

const Visited = (props: Props) => {
    const [ratingModalOpen, setRatingModalOpen] = useState(false);
    const [selectedRestaurant, setSelectedRestaurant] = useState<VisitedProps | null>(null);
    const [rating, setRating] = useState(0);
    const [error, setError] = useState('');
    const token = localStorage.getItem('token');
    // const navigate = useNavigate();
    const { visited, setRatingUpdated } = props;

    const handleRatingClick = (restaurant: VisitedProps) => {
        setSelectedRestaurant(restaurant);
        setRatingModalOpen(true);
    };
    
    const handleRatingSubmit = async (ratingValue: number) => {
        try {
            // Send the rating to the backend API
            if (token && selectedRestaurant) {
                const response = await axios.put(`http://localhost:5000/places/${selectedRestaurant._id}/rate`, { rating: ratingValue }, {
                    headers: {
                      Authorization: `Bearer ${token}`,
                    },
                });

                if (response && response.status === 200) {
                        // Close the modal and reset the state
                        setRatingUpdated(true);
                        setRatingModalOpen(false);
                        setSelectedRestaurant(null);
                        setRating(0);
                        // return;
                } else {
                  setError(response.data.error);
                }
            } else {
                setError('User is not authenticated, cannot submit rating');
            }
        } catch (error: any) {
            console.log('Error rating a place:', error);
            // if (error.response && error.response.status === 401) {
            //   localStorage.removeItem('token');
            //   localStorage.removeItem('pollExist');
            //   setError('Token has expired. Login again');
            //   setTimeout(() => navigate('/login'), 2000);
            // } else {
              setError('Error rating a place');
              setError(error.response.data.error);
            // }
        }
    };
    
    return (
        <section className="section-3">
            <h2 className="section-heading">
                Our Food Gallery
            </h2>
            <div className="gallery">
                {
                    visited && visited.map((visitedPlaces) => {
                        return (
                            <div key={visitedPlaces._id} className='gallery-div'>
                                <div className="image-container">
                                    <img className="food-img" src={DummyImg} alt={visitedPlaces.name} />
                                    <div className="food-details">
                                        <h3 className="food-name">{visitedPlaces.name}</h3>
                                        <p className="food-description">{visitedPlaces.description}</p>
                                        <>
                                            <p className="food-rating">{visitedPlaces.rating == 0 ? visitedPlaces.rating : visitedPlaces.rating.toFixed(2)} / 5
                                                {/* <span className="rating-info">
                                                    {visitedPlaces.ratings.length} {visitedPlaces.ratings.length === 1 ? 'vote' : 'votes'}
                                                </span> */}
                                            </p>
                                        </>
                                    </div>
                                </div>
                                <div className='food-actions'>
                                    <button 
                                        onClick={() => window.open(visitedPlaces.url, '_blank', 'noopener,noreferrer')} 
                                        className="gallery-link"
                                        >
                                        Visit Website
                                    </button>
                                    <button 
                                        onClick={() => handleRatingClick(visitedPlaces)} 
                                        className={`gallery-link ${token ? '' : 'disabled'}`}
                                        disabled={!token}
                                    >
                                        <span className={!token ? 'rate-text' : ''}>Rate</span>
                                        {!token && <i className="fas fa-info-circle info-icon"></i>}
                                    </button>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            <RatingModal
                rating={rating}
                setRating={setRating}
                isOpen={ratingModalOpen}
                onClose={() => setRatingModalOpen(false)}
                onSubmit={handleRatingSubmit}
                error={error}
            />
        </section>
    );
}
 
export default Visited;