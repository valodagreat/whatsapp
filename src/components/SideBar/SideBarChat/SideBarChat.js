import { Avatar } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import instance from '../../DataFetching/Axios';

import './SideBarChat.css';

function SideBarChat({addNewChat,id,name}) {
    const [seed, setSeed] = useState('');
    const [message, setMessages] = useState('')

    useEffect(()=>{
        setSeed(Math.floor(Math.random() * 5000))
    },[]);

    /*useEffect(() => {
        instance.get(`/api/v1/messages/sync/${id}`).then(response =>
            setMessages(response.data.message))
            
    },[id])*/

    useEffect(() => {
        instance.get(`/api/v1/messages/sync/${id}`).then(response =>
            setMessages(response.data.message))
    },[id,message])

    const createChat = ()=>{
        const roomName = prompt("Please enter name for chat room");

        if(roomName){
            instance.post('/whatsapp/rooms/new',{
                name : roomName
            })
            
        }
        
    }

    return !addNewChat ?(
        <Link to={`/rooms/${id}`}>
            <div className='sidebarChat'>
            <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
            <div className="sidebarChat_info">
                <h2>{name}</h2>
                <p>{message[message.length - 1]?.message}</p>
            </div>
        </div>
        </Link>
    ):(
        <div onClick={createChat} className="sidebarChat">
            <h2>Add New Chat</h2>
        </div>
    );
}

export default SideBarChat
