import {Grid, Button, ButtonGroup, Typography} from "@mui/material";
import {Link} from "react-router-dom";

export default function HomePage(){
    

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