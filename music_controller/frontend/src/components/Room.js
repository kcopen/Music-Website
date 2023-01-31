import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {Grid, Button, Typography} from "@mui/material";
import Setup from "./Setup";

export default function Room(){
    const navigate = useNavigate();
    const roomCode = useParams().roomCode;

    const [votesToSkip, setVotesToSkip] = useState(2);
    const [guestCanPause, setGuestCanPause] = useState(false);
    const [isHost, setIsHost] = useState(false);
    const [showSettings, setShowSettings] = useState(false);

    function getRoomDetails(){
        fetch('/api/get_room' + '?code=' + roomCode).then((response) => {
            if(response.ok) return response.json();
            else throw new Error("Not in room.")
        }).then((data)=> {
            setVotesToSkip(data.votes_to_skip);
            setGuestCanPause(data.guest_can_pause);
            setIsHost(data.is_host);
        }).catch((error)=>navigate("/"))
    }

    function leaveButtonPressed(){
        const requestOptions = {
            method: "POST",
            headers: {"Content-Type": "application/json"},
        }
        fetch('/api/leave_room', requestOptions).then((response) => {
            navigate("/");
        })
    }

    

    useEffect(()=>{
        getRoomDetails();
    },[])

    function settingsButton(){
        if(!isHost) return null;
        
        if(!showSettings) return <Button variant="contained" color="primary" onClick={()=>setShowSettings(true)}> Open Settings</Button>
        else return <Button variant="contained" color="secondary" onClick={()=>setShowSettings(false)}> Close Settings</Button>
    }

    function settings(){
        return (
            <Grid container spacing={1} align="center">
                <Grid item xs={12}>
                    <Setup roomCode={roomCode} votesToSkip={votesToSkip} guestCanPause={guestCanPause} updateCallback={getRoomDetails}/>
                    
                </Grid>
                <Grid item xs={12}>
                    {settingsButton()}
                </Grid>
            </Grid>
        )
    }

    function room(){
        return (
            <Grid container spacing={1} align="center">
                <Grid item xs={12}>
                    <Typography variant="h4" component="h4">
                        Room Code: {roomCode}
                    </Typography>
                </Grid>

                <Grid item xs={12}>
                    <Typography variant="p" component="p">
                        Votes to skip: {votesToSkip}
                    </Typography>
                </Grid>

                <Grid item xs={12}>
                    <Typography variant="p" component="p">
                        Guest can pause: {guestCanPause.toString()}
                    </Typography>
                </Grid>

                <Grid item xs={12}>
                    <Typography variant="p" component="p">
                        Host: {isHost.toString()}
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    {settingsButton()}
                </Grid>

                <Grid item xs={12}>
                    <Button variant="contained" color="secondary" onClick={leaveButtonPressed}>Leave Room</Button>
                </Grid> 
                
            </Grid>
        )
    }
   
    return showSettings ? settings() : room()
}