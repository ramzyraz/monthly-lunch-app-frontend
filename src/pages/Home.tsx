import Body from "../components/Body";
import Favorites from "../components/Favorites";
import Footer from "../components/Footer";
import Visited from "../components/Visited";
import { useState, useEffect } from "react";
import api from '../api/api';

const Home = () => {
  const [visited, setVisited] = useState([]);
  const [ratingUpdated, setRatingUpdated] = useState(false);
  const fetchData = async () => {
    try {
      // Fetch visited places
      const visitedResponse = await api.get('/places');
      console.log(visitedResponse.data);
      setVisited(visitedResponse.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (ratingUpdated) {
      fetchData();
      setRatingUpdated(false);
    }
  }, [ratingUpdated]);

  return ( 
    <div className="container">
      <Body />
      <Favorites visited={visited} />
      <Visited visited={visited} setRatingUpdated={setRatingUpdated} />
      <Footer />        
    </div>
  );
}
 
export default Home;