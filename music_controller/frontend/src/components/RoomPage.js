import {useState} from "react"
import {useParams} from "react-router-dom"

export default function Room(){
    const roomCode = useParams().roomCode

    const [votesToSkip, setVotesToSkip] = useState(2);
    const [guestCanPause, setGuestCanPause] = useState(false);
    const [isHost, setIsHost] = useState(false);

    function getRoomDetails(){
        fetch('/api/get_room' + '?code=' + roomCode).then((response) => {
            return response.json();
        }).then((data)=> {
                setVotesToSkip(data.votes_to_skip);
                setGuestCanPause(data.guest_can_pause);
                setIsHost(data.is_host);
            }
        )
    }

    getRoomDetails()
    return( 
        <div>
            <h3>{roomCode}</h3>
            <p>Votes to skip: {votesToSkip}</p>
            <p>Guest can pause: {guestCanPause.toString()}</p>
            <p>Host: {isHost.toString()}</p>
        </div>
    );
}