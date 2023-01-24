import {Button, Grid, Typography, TextField, FormHelperText, FormControl, Radio, RadioGroup, FormControlLabel, Collapse, Alert} from "@mui/material"
import {Link, useNavigate} from "react-router-dom"
import {useState} from "react"

function Setup(props){
    const title = props.roomCode ? "Settings" : "Create a room";
    const [guestsCanPause, setGuestsCanPause] = useState(props.guestsCanPause)
    const [votesToSkip, setVotesToSkip] = useState(props.votesToSkip)
    const [alertInfo, setAlertInfo] = useState({success:false, msg: ""})
    const navigate = useNavigate()

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
        }).then((data)=> {
            navigate('/room/' + data.code);
        })
    }

    function handleUpdateButtonPressed(){
        const requestOptions={
            method: 'PATCH',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                guest_can_pause: guestsCanPause,
                votes_to_skip: votesToSkip,
                code: props.roomCode
            })
        };
        fetch('/api/update_room', requestOptions).then((response)=>{
            if(response.ok){
                setAlertInfo({success: true, msg: "Settings have been updated."})
            } else {
                setAlertInfo({success: false, msg: "Failed to update settings."})
            }
            props.updateCallback()
        });
    }

    return(
        <Grid container spacing={1} align="center">
            <Grid item xs={12}>
                <Collapse in={alertInfo.msg != ""}>
                    <Alert severity={alertInfo.success ? "success" : "error"} onClose={()=>setAlertInfo({success: alertInfo.success, msg: ""})}>
                        {alertInfo.msg}
                    </Alert>
                </Collapse>
            </Grid>
            <Grid item xs={12}>
                <Typography component="h4" variant="h4">
                    {title}
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <FormControl component="fieldset">
                    <FormHelperText align="center">
                        Guest Control of Playback State
                    </FormHelperText>
                    <RadioGroup row defaultValue={props.guestsCanPause} onChange={(e)=>setGuestsCanPause(e.target.value === "true" ? true : false)}>
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
            <Grid item xs={12}>
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
            {props.roomCode ? 
                <Grid item xs={12}>
                    <Button color="primary" variant="contained" onClick={handleUpdateButtonPressed}>Update</Button>
                </Grid> :
                <Grid item xs={12}>
                    <Button color="primary" variant="contained" onClick={handleCreateRoomButtonPressed}>Create a room</Button>
                    <Button color="secondary" variant="contained" to="/" component={Link}>Back</Button>
                </Grid>
            }
        </Grid>
    );
};

Setup.defaultProps = {
    roomCode : null,
    votesToSkip : 2,
    guestsCanPause : true,
    updateCallback: ()=>{},
};

export default Setup;