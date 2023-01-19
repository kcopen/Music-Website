import {BrowserRouter, Routes, Route } from "react-router-dom";
import RoomJoinPage from "./RoomJoinPage";
import CreateRoomPage from "./CreateRoomPage";
import HomePage from "./HomePage";

export default function App(){
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<HomePage />} />
                <Route path="/join_room" element={<RoomJoinPage />} />
                <Route path="/create_room" element={<CreateRoomPage />} />
            </Routes>
        </BrowserRouter>
        
    );
};