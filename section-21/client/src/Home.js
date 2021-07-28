import './Home.css';
import { useState, useEffect, useRef } from 'react';
import { socket } from './socket';

function Home(props) {
  const [message, setMessage] = useState('');
  const [messageList, setMessageList] = useState([]);
  const messageEnd = useRef(null);

  useEffect(() => {
    socket.on('chat-incoming', (value) => {

      let temp = messageList;
      temp.push(value);

      setMessageList([...temp]);
      scrollToBottom();
    });

    return function cleanup() {
      socket.off('chat-incoming');
    }
    
  }, []);

  function scrollToBottom () {
    messageEnd.current.scrollIntoView();
  }

  function submitMessage (e) {
    e.preventDefault();
    if (message) {
      socket.emit('chat', {
        message: message,
        sender: props.user.email
      });
      setMessage('');
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <div className="chat-container">
          <div className="messages-container">
            {
              messageList.map(message => {
                return <div className={`message ${message.sender === props.user.email ? 'message-right' : 'message-left'}`} key={message.message}>
                  <div className="message-content">
                    <div className="text">{message.message}</div>
                    <div className="email">{message.sender}</div>
                  </div>
                </div>
              })
            }
            <div ref={messageEnd}></div>
          </div>
          <form onSubmit={(e) => submitMessage(e)}>
            <div className="input-container">
              <input value={message} onChange={(e) => setMessage(e.target.value)}
                placeholder="Type something..."></input>
              <button type='submit'>Send</button>
            </div>
          </form>
        </div>
      </header>
    </div>
  );
}

export default Home;
