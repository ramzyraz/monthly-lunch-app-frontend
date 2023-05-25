import { useNavigate } from "react-router-dom";
import travolta from '../assets/travolta.gif'

const ErrorPage = () => {
  const navigate = useNavigate();
  return (
    <section id="error-page" className="error-container">
      <div className="error">
        <h1 className="error-h1">Uh Ohh !</h1>
        <p className="error-p">We can't find the page that you're looking for :(</p>
        <div className="cta">
          <button onClick={() => navigate(-1)} className="cta-back">Go Back</button>
        </div>
      </div>
      <img src={travolta} alt="error page image" className="error-img" />
    </section>
  );
}

export default ErrorPage;