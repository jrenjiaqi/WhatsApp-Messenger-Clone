import { Avatar, IconButton } from '@material-ui/core';
import {React, useState} from 'react';
import './Chat.css';
import { AttachFile, MoreVert, SearchOutlined } from '@material-ui/icons';
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import MicIcon from "@material-ui/icons/Mic";
import axios from "./axios"; // from local axios

function Chat({ messages }) {

    const [input, setInput] = useState('');

    const sendMessage = async (e) => {
        e.preventDefault();

        const dateTime = new Date().toUTCString();

        await axios.post('/messages/new', {
            message: input,
            name: "Ren",
            timestamp: dateTime,
            received: true
        });

        setInput('');
    };

    return (
        <div className='chat'>
            <div className='chat__header'>
                {/* Defines components in the chat header */}
                <Avatar src='https://www.graphicsprings.com/filestorage/stencils/3abc2b85083ae73005800eba84ed4dc0.png?width=500&height=500'/>

                <div className='chat__headerInfo'>
                    {/* Room name and last seen at */}
                    <h3>Dance Room</h3>
                    <p>Last seen at {new Date().toUTCString()}</p>
                </div>

                <div className='chat__headerRight'>
                    {/* Three buttons on the right of chat header */}
                    <IconButton>
                        <SearchOutlined />
                    </IconButton>
                    <IconButton>
                        <AttachFile />
                    </IconButton>
                    <IconButton>
                        <MoreVert />
                    </IconButton>
                </div>
            </div>

            <div className='chat__body'>
                {messages.map((message) => (                
                    <p className={`chat__message ${message.received && 'chat__receiver'}`}>
                        <span className='chat__name'>{message.name}</span>
                        {message.message}
                        <span className='chat__timestamp'>
                            {message.timestamp}
                        </span>
                    </p>
                ))}
            </div>

            <div className='chat__footer'>
                <InsertEmoticonIcon />
                <form>
                    <input
                        value={input} 
                        onChange={e => setInput(e.target.value)}
                        placeholder='Type a message'
                        type="text"
                    />
                    <button onClick={sendMessage} type='submit'>
                        Send a message
                    </button>
                </form>
                <MicIcon />
            </div>
        </div>
    )
}

export default Chat
