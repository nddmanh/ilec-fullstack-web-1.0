import './App.css';
import { useState, useEffect } from 'react';

function App(props) {
  const [message, setMessage] = useState('');
  const [messageList, setMessageList] = useState([]);

  useEffect(() => {
    props.socket.on('chat-incoming', (value) => {
      let temp = messageList;
      temp.push(value);

      setMessageList([...temp]);
    });
    
  }, [props.socket]);

  function submitMessage () {
    props.socket.emit('chat', {
      message: message,
      sender: props.socket.id
    });
    setMessage('');
  }

  return (
    <div className="App">
      <header className="App-header">
        <div className="chat-container">
          <div className="messages-container">
            {
              messageList.map(message => {
                return <div className={`message ${message.sender === props.socket.id ? 'message-right' : 'message-left'}`} key={message.message}>
                  <div className="message-content">{message.message}</div>
                </div>
              })
            }
          </div>
          <div className="input-container">
            <input value={message} onChange={(e) => setMessage(e.target.value)}
              placeholder="Type something..."></input>
            <button onClick={submitMessage}>Send</button>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
