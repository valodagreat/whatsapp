import { Avatar, IconButton } from '@material-ui/core';
import { AttachFile, MoreVert, SearchOutlined } from '@material-ui/icons';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import MicIcon from '@material-ui/icons/Mic';
import React, { useEffect, useState } from 'react';
import './Chat.css';
import { useParams } from 'react-router-dom';
import { useStateValue } from '../../StateProviders/StateProvider';
import instance from '../DataFetching/Axios';
import Pusher from 'pusher-js';

function Chat() {
    
    const [seed, setSeed] = useState('');
    const {roomId} = useParams();
    const [roomName,setRoomName] = useState('');
    const [messages, setMessages] = useState([]);
    const [{user}] = useStateValue()


    useEffect(() => {
        instance.get(`/api/v1/messages/sync/${roomId}`).then(response=>
            setMessages(response.data.message));

            instance.get(`/whatsapp/rooms/sync/${roomId}`).then(response=>{
                setRoomName(response.data.room.name)
                })
    },[roomId])

    useEffect(()=>{
        setSeed(Math.floor(Math.random() * 5000))
    },[roomId]);


    useEffect(() => {
        const pusher = new Pusher('c749c0a525d952c26b14', {
        cluster: 'eu'
        });

        const channel = pusher.subscribe('message');
        channel.bind('inserted', function(data) {
        setMessages([...messages, data]);
        });

        return ()=>{
        channel.unbind_all();
        channel.unsubscribe();
        }

    },[messages]);

    const [whatmsg, setWhatmsg] = useState("")

    const sendMessage = async (event) => {
        event.preventDefault();
        
        instance.post(`/api/v1/messages/new/${roomId}`,{
            message : whatmsg,
            name : user.displayName
        })
        setWhatmsg("");
    }

    function formatAMPM(date) {
        let hours = date.getHours();
        let minutes = date.getMinutes();
        let ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0'+minutes : minutes;
        let strTime = hours + ':' + minutes + ' ' + ampm;
        return strTime;
    }

    const lastday =messages.length>0 ? new Date(messages[messages.length - 1].timestamp).toDateString() : null;
    const day = new Date().toDateString();
    const lasttime =messages.length>0 ? new Date(messages[messages.length - 1].timestamp) : null;

    return (
        <div className='chat'>
            <div className="chat_header">
                <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}/>
                <div className="chat_headerInfo">
                    <h3>{roomName}</h3>
                    <p>Last seen at {lastday !== null ? day.toString().toLowerCase() === lastday.toString().toLowerCase() ? formatAMPM(lasttime) : (lastday,formatAMPM(lasttime)) : null}</p>
                </div>
                <div className="chat_headerRight">
                <IconButton>
                        < SearchOutlined />
                    </IconButton>
                    <IconButton>
                        < AttachFile />
                    </IconButton>
                    <IconButton>
                        < MoreVert />
                    </IconButton>
                </div>
            </div>
            <div className="chat_body">
                {messages.length>0 ? messages.map(message =>{
                    return(
                        <p key={message.id} className={`chat_message ${message.name === user.displayName && `chat_receiver`}`}>
                        <span className="chat_name">
                            {message.name}
                        </span>
                        {message.message}
                        <span className="chat_timestamp">
                            {formatAMPM(new Date(message.timestamp))}
                        </span>
                    </p>
                    )
                }) : null}
            </div>
            <div className="chat_footer">
                < InsertEmoticonIcon />
                <form >
                    <input type="text" value={whatmsg} onChange={(event)=> setWhatmsg(event.target.value)} placeholder='Type a message'/>
                    <button type='submit' onClick={sendMessage} >
                        Send a message
                    </button>
                </form>
                <MicIcon />
            </div>
        </div>
    )
}

export default Chat
