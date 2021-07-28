import { useState, useEffect } from 'react';
import { Switch, BrowserRouter } from 'react-router-dom';
import { GuardProvider, GuardedRoute } from 'react-router-guards';
import Home from './Home';
import Login from './Login';
import Register from './Register';
import Cookie from 'js-cookie';
import axios from 'axios';
import configs from './config';

export default function App() {
  const [user, setUser] = useState({});

  useEffect(() => {
    fetchUser();
  }, []);

  async function fetchUser () {
    try {
      const response = await axios.get(`${configs.API_URL}/api/users/profile`, {
        headers: {
          Authorization: Cookie.get('token')
        }
      });

      if (response.status === 200 && response.data) {
        setUser(response.data);
      }

    } catch (error) {
      //
    }
  }

  function checkAuthenticate (to, from, next) {
    if (to.meta.requireAuth) {
      if (Cookie.get('token')) {
        next();
      } else {
        next.redirect('/login');
      }
    }

    return next();
  }

  return <BrowserRouter>
    <main>
      <GuardProvider guards={[checkAuthenticate]}>
        <Switch>
          <GuardedRoute exact path='/' meta={{requireAuth: true}}>
            <Home user={user}/>
          </GuardedRoute>
          <GuardedRoute path='/login'>
            <Login fetchUser={fetchUser}/>
          </GuardedRoute>
          <GuardedRoute path='/register'>
            <Register />
          </GuardedRoute>
        </Switch>
      </GuardProvider>
    </main>
  </BrowserRouter>
}