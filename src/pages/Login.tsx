import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await axios.post('http://localhost:5000/users/login', { email, password });
      if (response && response.status === 200) {
        const token = response.data.token;
        localStorage.setItem('token', token);
        navigate('/');  
      } else {
        setError(response.data.error);
      }
    } catch (error: any) {
      setError(error.response.data.error);
    }
  };

  return (
    <section className="section-add"> 
        <div className="modal-container">
            <h2 className="modal-heading">Log in Your Account</h2>
            <form onSubmit={handleSubmit} className="modal-form">
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder='Enter Email'
                    autoComplete='username email'
                    required
                />
                <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder='Enter Password'
                    autoComplete='current-password'
                    required
                />
                <label>
                    <input type="checkbox" checked={showPassword} onChange={() => setShowPassword(!showPassword)} className='modal-checkbox' />
                    <span className='modal-checkbox-text'>Show Password</span>
                </label>
                <button type="submit" className='next-button'>Login</button>
                {error && <p className="error-msg">{error}</p>}
            </form>
            <p className='signup-text'>Don't have an account? <button onClick={() => navigate('/signup')} className='signup-button'>Sign Up</button></p>
        </div>
    </section>
  );
};

export default Login;
