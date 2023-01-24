import {Grid, Button, ButtonGroup, Typography} from "@mui/material";
import {Link, useNavigate} from "react-router-dom";
import {useEffect} from "react";


export default function HomePage(){
    const navigate = useNavigate();

    useEffect(()=>{
        fetch('/api/user_in_room').then((response)=>{
            return response.json();
        }).then((data)=>{
            if(data.code) navigate(`/room/${data.code}`);
        });
    }, []);

    return(
        <Grid container spacing={3} align="center">
            <Grid item xs={12}>
                <Typography variant="h3" component="h3">House Party</Typography>
            </Grid>
            <Grid item xs={12}>
                <ButtonGroup disableElevation variant="contained" color="primary" >
                    <Button color="primary" to="/join_room" component={Link}>Join a room</Button>
                    <Button color="secondary" to="/create_room" component={Link}>Create a room</Button>
                </ButtonGroup>
            </Grid>
        </Grid>
    );
};