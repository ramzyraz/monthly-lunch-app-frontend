import { useState, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

type PlacesVisitType = {
    _idx: string,
    name: string,
    description: string,
    url: string
}

type PollProps = {
    isOpen: boolean,
    onClose: () => void
    placesToVisit: PlacesVisitType[]
}

const CreatePollModal = (props: PollProps) => {
  const { isOpen, onClose, placesToVisit } = props;
  const [question, setQuestion] = useState('');
  const [error, setError] = useState('');
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  const options = placesToVisit.map((place, index) => ({
    text: place.name,
    optionId: index,
    votes: 0
  }));

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/polls', { question, options }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      if (response && response.status === 201) {
          onClose();
          localStorage.setItem('pollExist', 'true');
          localStorage.removeItem('voted');
          localStorage.removeItem('votedId');
          navigate('/poll');  
      } else {
          setError(response.data.error);
          onClose();
      }
    } catch (error: any) {
      console.log('Error creating poll:', error);
      // if (error.response && error.response.status === 401) {
      //   localStorage.removeItem('token');
      //   localStorage.removeItem('pollExist');
      //   setError('Token has expired. Login again');
      //   setTimeout(() => navigate('/login'), 2000);
      // } else {
        setError('Error creating poll');
      // }
      // onClose();
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal">
      <div className="modal-content">
        <h2 className='modal-header'>Create a Poll</h2>
        <div className="rating-component">
          <input 
            type="text" 
            className='poll-question'
            value={question} 
            onChange={(e: ChangeEvent<HTMLInputElement>) => setQuestion(e.target.value)}
            placeholder='Enter the poll question'
            required 
          />
        </div>
        <div className='modal-buttons'>
          <button onClick={onClose} className='modal-button modal-close'>Cancel</button>
          {error && <p className="error-msg">{error}</p>}
          <button onClick={handleSubmit} className='modal-button modal-submit'>Submit</button>
        </div>
      </div>
    </div>
  );
};

export default CreatePollModal;
