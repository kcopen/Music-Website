import {BrowserRouter, Routes, Route} from "react-router-dom";
import RoomJoinPage from "./RoomJoinPage";
import Setup from "./Setup";
import Home from "./Home";
import Room from "./Room";

export default function App(){
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route path="/join_room" element={<RoomJoinPage />} />
                <Route path="/create_room" element={<Setup />} />
                <Route path="/room/:roomCode" element={<Room />} />
            </Routes>
        </BrowserRouter>
    );
};