import React, { useEffect, useState } from 'react';
import './Sidebar.css';
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { Avatar, IconButton } from '@material-ui/core';
import { SearchOutlined } from '@material-ui/icons';
import SideBarChat from './SideBarChat/SideBarChat';
import instance from '../DataFetching/Axios';
import { useStateValue } from '../../StateProviders/StateProvider';
import Pusher from 'pusher-js';

function SideBar() {
    const [rooms,setRooms]= useState([]);
    const [{user},] = useStateValue();

    useEffect(()=>{
        const pusher = new Pusher('c749c0a525d952c26b14', {
            cluster: 'eu'
            });
    
            const channel = pusher.subscribe('room');
            channel.bind('inserted', function(data) {
            setRooms([...rooms, data]);
            });

        return ()=>{
            channel.unbind_all();
            channel.unsubscribe(); 
        }
    },[rooms])

    useEffect(() => {
        instance.get("/whatsapp/rooms/sync").then(response=>{
        setRooms(response.data.room)
        })
    },[])

    return (
        <div className='sidebar'>
            <div className="sidebar_header">
                < Avatar src={user?.photoURL}/>
                <div className="sidebar_headerRight">
                    <IconButton>
                        < DonutLargeIcon />
                    </IconButton>
                    <IconButton>
                        < ChatIcon />
                    </IconButton>
                    <IconButton>
                        < MoreVertIcon />
                    </IconButton>
                </div>
            </div>
            <div className="sidebar_search">
                <div className="sidebar_searchContainer">
                    < SearchOutlined />
                    <input type="text" placeholder="Search or start new chat" />
                </div>
            </div>
            <div className="sidebar_chats">
                <SideBarChat addNewChat />
                {rooms.map(room=>{
                    return <SideBarChat key={room._id} id={room._id} name={room.name} />
                })}
            </div>
        </div>
    )
}

export default SideBar
