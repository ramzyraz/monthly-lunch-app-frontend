import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CreatePollModal from "../components/CreatePoll";
import DummyImg from '../assets/dummy.jpg';
import api from '../api/api';

type PlacesVisitType = {
    _idx: string,
    name: string,
    description: string,
    url: string
}

const ToVisit = () => {
    const [placesToVisit, setPlacesToVisit] = useState([]);
    const [pollModalOpen, setPollModalOpen] = useState(false);
    const token = localStorage.getItem('token');
    const pollExists = localStorage.getItem('pollExist');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
          try {
            const [placesToVisitResponse, pollsResponse] = await Promise.all([
              api.get('/placesToVisit'),
              api.get('/polls')
            ]);
      
            setPlacesToVisit(placesToVisitResponse.data);
      
            if (pollsResponse.data.length > 0) {
              localStorage.setItem('pollExist', 'true');
            }
      
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
      
        fetchData();
      }, []);

    return (
        <section className="section-3">
            <h2 className="section-heading">Places to Visit</h2>
            <div className="buttons-pos">
                <button className="redirect-link-button" onClick={() => navigate('/addvisit')} >
                    <span className="redirect-link-text">Add New Place</span>
                    <i className="fas fa-car-side redirect-link-icon"></i>
                </button>
                <button 
                    onClick={() => setPollModalOpen(true)} 
                    className={`redirect-link-button ${token ? '' : 'disabled'}`}
                    disabled={!token}
                >
                    <span className="redirect-link-text">Create a Poll</span>
                    {
                        !token ? <i className="fas fa-info-circle redirect-info-icon"></i> 
                        : <i className="fas fa-car-side redirect-link-icon"></i>
                    }
                </button>
                {
                    pollExists && JSON.parse(pollExists) && (
                        <button 
                            onClick={() => navigate('/poll')}
                            className={`redirect-link-button ${token ? '' : 'disabled'}`}
                            // className="redirect-link-button" 
                            disabled={!token} 
                        >
                            <span className="redirect-link-text">View Latest Poll</span>
                        </button>
                    )
                }
            </div>
            <div className="gallery">
                {
                    placesToVisit && placesToVisit.map((places: PlacesVisitType) => {
                        return (
                            <div key={`${places._idx} + ${places.name}`} className="gallery-link-tovisit tw-border tw-shadow-lg tw-rounded-lg tw-hover:scale-105 tw-duration-500">
                                <img className="food-img" src={DummyImg} />
                                <div className='tw-flex tw-justify-between tw-px-2 tw-py-4'>
                                    <p className='tw-text-white tw-text-2xl tw-font-bold tw-px-4'>{places.name}</p>
                                    <p className='tw-text-white tw-text-xl tw-font-600 tw-px-4'>
                                        {places.description.length > 40 ? places.description.substring(0, 40) : places.description}
                                    </p>
                                    <p>
                                        <button className="tw-bg-orange-500 tw-text-white tw-px-4 tw-py-1 tw-rounded-md" onClick={() => window.open(places.url, '_blank', 'noopener,noreferrer')}>Visit Website</button>
                                    </p>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            <CreatePollModal
                isOpen={pollModalOpen}
                onClose={() => setPollModalOpen(false)}
                placesToVisit={placesToVisit}
            />
        </section>
    )
}

export default ToVisit