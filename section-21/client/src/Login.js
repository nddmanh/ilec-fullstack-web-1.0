import './Home.css';
import { useState } from 'react';
import axios from 'axios';
import Cookie from 'js-cookie';
import { useHistory, Link } from "react-router-dom";
import { initConnection } from './socket';
import configs from './config';

function Login(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  async function login(e) {
    e.preventDefault();
    try {
      const response = await axios.post(`${configs.API_URL}/api/auth/login`, {
        email: email,
        password: password
      });

      if (response.status === 200 && response.data && response.data.token) {
        Cookie.set('token', response.data.token);
        initConnection();
        props.fetchUser();
        // redirect to home
        history.push('/');
      }

    } catch (error) {
      alert(error.message);
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <h3>Login</h3>
        <form onSubmit={(e) => login(e)}>
          <div className="login-container">
            <input value={email} onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"></input>
            <input value={password} type='password' onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"></input>
            <button type='submit'>Login</button>
          </div>
        </form>
        <Link to="/register">
          <a className="register-link">Don't have an account? Sign up now.</a>
        </Link>
      </header>
    </div>
  );
}

export default Login;
