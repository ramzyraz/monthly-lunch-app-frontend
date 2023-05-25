import { useState, useEffect } from 'react';
import { Navigate, useNavigate } from "react-router-dom";
import MultiplePoll from '../components/MultiplePoll/MultiplePoll';
import axios from 'axios';

type IPollOption = {
  _id: string,
  optionId: number,
  text: string,
  votes: number,
}

type IPollVote = {
  userId: string,
  votedOption: string,
}

type PollType = {
  _id: string,
  question: string,
  options: IPollOption[],
  votes: IPollVote[],
  createdAt: Date
}

const CurrentPoll = () => {
  const [poll, setPoll] = useState<PollType | null>(null);
  const [error, setError] = useState('');
  const token = localStorage.getItem('token');
  const hasVotedLS = localStorage.getItem('voted');
  const voteIdLS = localStorage.getItem('votedId');
  const navigate = useNavigate();

  const themeData = {
    textColor: '#19181f',
    mainColor: '#00B87B',
    backgroundColor: 'white',
    alignment: 'center',
    leftColor: '#00B87B',
    rightColor: '#FF2E00',
  }

  useEffect(() => {
    // Fetch the poll data from the backend
    const fetchPoll = async () => {
      try {
        const response = await axios.get('http://localhost:5000/polls/latest');
        setPoll(response.data);
      } catch (error) {
        console.error('Error fetching poll:', error);
      }
    };

    fetchPoll();
  }, []);
  
  async function vote(item: IPollOption) {
    try {
      if (poll) {
        const response = await axios.post(`http://localhost:5000/polls/${poll._id}/vote`, { optionId: item.optionId }, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        
        if (response && response.status === 200) {
          setPoll(response.data.poll);
          localStorage.setItem('voted', 'true');
          localStorage.setItem('votedId', `${item.optionId}`);
        } else {
          setError(response.data.error);
        }
      }
    } catch (error: any) {
      console.log('Error adding vote to poll:', error);
      // if (error.response && error.response.status === 401) {
      //   localStorage.removeItem('token');
      //   localStorage.removeItem('pollExist');
      //   setError('Token has expired. Login again');
      //   setTimeout(() => navigate('/login'), 2000);
      // } else {
        setError('Error adding vote to poll');
        setError(error.response.data.error);
      // }
    }
  }

  const hasVoted = hasVotedLS ? JSON.parse(hasVotedLS) : false;
  const voteId = voteIdLS ? parseInt(voteIdLS) : -1;

  const pollFunction = () => {
    return (
      <section className="section-poll">
        <div className="poll-container">
          {poll ? (
            <MultiplePoll
            question={poll.question}
            results={poll.options}
            theme={themeData}
            onVote={vote}
            isVoted={hasVoted}
            isVotedId={voteId}
            error={error}
            />
            ) : (
              <p>Loading poll...</p>
              )}
        </div>
        <div className="back-div">
          <button onClick={() => navigate('/tovisit')} className="back-button">Go Back to Non Visited</button>
          <button onClick={() => navigate('/')} className="back-button-home">Go Back to Home</button>
        </div>
      </section>
    )
  }

  return token ? pollFunction() : <Navigate to="/login" />;
};

export default CurrentPoll;