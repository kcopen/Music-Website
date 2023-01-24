import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import RoomJoinPage from "./RoomJoinPage";
import CreateRoomPage from "./CreateRoomPage";
import HomePage from "./HomePage";
import Room from "./RoomPage";
import {useEffect, useState} from "react";

export default function App(){
    const [roomCode, setRoomCode] = useState(null);

    useEffect(()=>{
        async function fetchData(){
            fetch('/api/user_in_room').then((response)=>{
                return response.json();
            }).then((data)=>{
                setRoomCode(data.code);
            });
        }
        fetchData();
    }, []);

    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={roomCode ? <Navigate to={`/room/${roomCode}`}/> : <HomePage />} />
                <Route path="/join_room" element={<RoomJoinPage />} />
                <Route path="/create_room" element={<CreateRoomPage />} />
                <Route path="/room/:roomCode" element={<Room />} />
            </Routes>
        </BrowserRouter>
    );
};