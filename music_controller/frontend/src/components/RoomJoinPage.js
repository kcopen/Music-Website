import {TextField, Button, Grid, Typography} from "@mui/material";
import {Link, useNavigate} from "react-router-dom";
import {useState} from "react";

export default function RoomJoinPage(){
    const [roomCode, setRoomCode] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    function enterRoomButtonPressed(){
        const requestOptions = {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                code: roomCode
            })
        };

        fetch('/api/join_room', requestOptions).then((response)=>{
            if(response.ok){
                navigate(`/room/${roomCode}`);
            } else {
                setError("Room not found.");
                setRoomCode("")
            }
        }).catch((error)=>{
            console.log(error);
        })
    }
    
    return(
        <Grid container spacing={1} align="center">
            <Grid item xs={12}>
                <Typography variant="h4" component="h4" >
                    Join a room.
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <TextField 
                    error={ error ? true : false}
                    label="Code"
                    placeholder="Enter a room code."
                    value={ roomCode }
                    helperText={ error }
                    variant="outlined"
                    onChange={e=>setRoomCode(e.target.value)}
                />
            </Grid>
            <Grid item xs={12}>
                <Button variant="contained" color="primary" onClick={enterRoomButtonPressed}>Enter room</Button>
            </Grid>
            <Grid item xs={12}>
            <Button variant="contained" color="secondary" to="/" component={Link}>Back</Button>
            </Grid>
        </Grid>
    );
};