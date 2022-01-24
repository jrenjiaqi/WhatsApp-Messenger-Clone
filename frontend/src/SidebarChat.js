import { React, useState, useEffect } from 'react'
import './SidebarChat.css'
import { Avatar } from '@material-ui/core';

function SidebarChat( {roomName, lastMessage, addNewChat} ) {
    const [seed, setSeed] = useState('');

    useEffect( () => {
        setSeed(Math.floor(Math.random() * 5000));
    }, []);

    const createChat = () => {
        const roomName = prompt("Please enter name for chat");
    };

    return !addNewChat ? (
        <div className='sidebarChat'>
            <Avatar src={`${roomName === 'Dance Room' ? 'https://www.graphicsprings.com/filestorage/stencils/3abc2b85083ae73005800eba84ed4dc0.png?width=500&height=500' : `https://avatars.dicebear.com/api/human/${seed}.svg`}`}/>
            <div className='sidebarChat__info'>
                <h2>{`${roomName}`}</h2>
                <p>{`${lastMessage}`}</p>
            </div>
        </div>
    ): (
        <div onClick={createChat} className='sidebarChat'>
            <h2>Add new Chat</h2>
        </div>
    );
}

export default SidebarChat
