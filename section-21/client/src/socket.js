import Cookie from 'js-cookie';
import { io } from 'socket.io-client';
import configs from './config';

let socket;

function initConnection () {
  socket = io(configs.API_URL, {
    query: {
      token: Cookie.get('token')
    }
  });
}

export {
  initConnection,
  socket
};