import './Home.css';
import { useState } from 'react';
import axios from 'axios';
import { useHistory, Link } from "react-router-dom";
import configs from './config';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmedPassword, setConfirmedPassword] = useState('');
  const history = useHistory();
  
  async function register (e) {
    e.preventDefault();
    try {
      if (password !== confirmedPassword) {
        alert('Confirmed password did not match!!!');
        return;
      }

      const response = await axios.post(`${configs.API_URL}/api/auth/register`, {
        email: email,
        password: password
      });

      if (response.status === 200) {
        // redirect to login
        history.push('/login');
      }

    } catch (error) {
      alert(error.message);
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <h3>Register</h3>
        <form onSubmit={(e) => register(e)}>
          <div className="login-container">
            <input value={email} onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"></input>
            <input value={password} type='password' onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"></input>
            <input value={confirmedPassword} type='password' onChange={(e) => setConfirmedPassword(e.target.value)}
              placeholder="Confirm your password"></input>
            <button type='submit'>Register</button>
          </div>
        </form>
        <Link to="/login">
          <a className="register-link">Already have an account? Login.</a>
        </Link>
      </header>
    </div>
  );
}

export default Register;
