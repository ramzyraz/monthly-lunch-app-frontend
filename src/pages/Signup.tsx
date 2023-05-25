import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (password !== passwordConfirmation) {
        setError('Passwords do not match'); 
        return;
    }

    try {
        const response = await axios.post('http://localhost:5000/users/signup', { name, email, password, passwordConfirmation });
        console.log(response);
        if (response.status === 201) {
            alert("Sign up Successful!!");
            navigate('/login');
        } else {
            setError(response.data.error);
        }
    } catch (error: any) {
        console.log(error);
        setError(error.response.data.error);
    }
  }

  return (
    <section className="section-add"> 
        <div className="modal-container">
            <h2 className="modal-heading">Create your Account</h2>

            <form onSubmit={handleSubmit} className="modal-form">
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter Name"
                    required
                />
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter Email"
                    required
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter Password"
                    required
                />
                <input
                    type="password"
                    value={passwordConfirmation}
                    onChange={(e) => setPasswordConfirmation(e.target.value)}
                    placeholder="Enter Password Again"
                    required
                />
                <button type="submit" className='next-button'>Signup</button>
                {error && <p className='error-msg'>{error}</p>}
            </form>
            <p className='signup-text'>Already have an account? <button onClick={() => navigate('/login')} className='signup-button'>Login</button></p>
        </div>
    </section>
  );
};

export default Signup;