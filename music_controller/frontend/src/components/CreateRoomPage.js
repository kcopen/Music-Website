import {Button, Grid, Typography, TextField, FormHelperText, FormControl, Radio, RadioGroup, FormControlLabel} from "@mui/material"
import {Link} from "react-router-dom"
import {useState} from "react"
export default function CreateRoomPage(){
    const [guestsCanPause, setGuestsCanPause] = useState(true)
    const [votesToSkip, setVotesToSkip] = useState(2)

    function handleCreateRoomButtonPressed(){
        const requestOptions={
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                guest_can_pause: guestsCanPause,
                votes_to_skip: votesToSkip
            })
        };
        fetch('/api/create_room', requestOptions).then((response)=>{
            return response.json()
        }).then((data)=> console.log(data))
    }
    return(
        <Grid container spacing={1}>
            <Grid item xs={12} align="center">
                <Typography component="h4" variant="h4">
                    Create a room
                </Typography>
            </Grid>
            <Grid item xs={12} align="center">
                <FormControl component="fieldset">
                    <FormHelperText align="center">
                        Guest Control of PLayback State
                    </FormHelperText>
                    <RadioGroup row defaultValue="true" onChange={(e)=>setGuestsCanPause(e.target.value === "true" ? true : false)}>
                        <FormControlLabel 
                            value="true" 
                            control={<Radio color="primary" />} 
                            label="Play/Pause" 
                            labelPlacement="bottom" 
                        />
                        <FormControlLabel 
                            value="false" 
                            control={<Radio color="secondary" />} 
                            label="No Control" 
                            labelPlacement="bottom" 
                        />
                    </RadioGroup>
                </FormControl>
            </Grid>
            <Grid item xs={12} align="center">
                <FormControl>
                    <TextField 
                        required={true} 
                        type="number"
                        onChange={(e)=> setVotesToSkip(e.target.value)}
                        value={votesToSkip} 
                        inputProps={
                            {
                                min:1,
                                style: {textAlign: "center"}
                            }
                        }
                    />
                    <FormHelperText align="center">
                            Votes required to skip song.
                    </FormHelperText>
                </FormControl>
            </Grid>
            <Grid item xs={12} align="center">
                <Button color="primary" variant="contained" onClick={handleCreateRoomButtonPressed}>Create a room</Button>
            </Grid>
            <Grid item xs={12} align="center">
                <Button color="secondary" variant="contained" to="/" component={Link}>Back</Button>
            </Grid>
        </Grid>
    );
};