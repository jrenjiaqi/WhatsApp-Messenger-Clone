import React, { useEffect, useState } from 'react'
import './App.css';
import Sidebar from './Sidebar';
import Chat from './Chat';
import Login from './Login'
import Pusher from 'pusher-js';
import axios from './axios'; // from local 'axios.js' file
import { useStateValue } from './StateProvider'

function App() {
  const [messages, setMessages] = useState([]);
  const [{ user }, dispatch] = useStateValue();

  useEffect(() => {
    axios.get('/messages/sync')
      .then((response) => {
        setMessages(response.data);
      })
  }, [])

  useEffect(() => {
    const pusher = new Pusher('52015e15ff268b3ad92a', {
      cluster: 'eu'
    });

    const channel = pusher.subscribe('messages');
    channel.bind('inserted', (newMessage) => {
      setMessages([...messages, newMessage])
    });

    // cleanup function to unbind and unsubscribe as done above
    // ensures we only have one subscriber.
    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };

  }, [messages]);

  console.log(messages);

  return (
    <div className="app">
      {!user ? (
        <Login />
      ) : (
      <div className='app__body'>
        <Sidebar />
        <Chat messages={messages}/>
      </div>
      )}
    </div>
  );
}

export default App;
