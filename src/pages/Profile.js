import { Button, Card, CardContent, CardHeader, Divider, Grid, makeStyles, Typography } from "@material-ui/core"
import { useHistory } from "react-router-dom";

const useStyles = makeStyles({
    card:{
        width:400
    },
    button:{
        marginTop: 10
    }
})

const Profile = () => {
    const history = useHistory();
    const classes = useStyles();
    return ( 
        <div align="center">
            <Card elevation={4} className={classes.card}>
                <CardHeader
                    title = "Profile"
                />
                <Divider />
                <CardContent align="left">
                    <Grid container >
                        <Grid item xs={3}>
                            <Typography variant="h6" color="textSecondary" component="p">
                                Name 
                            </Typography>
                        </Grid>
                        <Grid item xs={9}>
                            <Typography variant="h6" color="textSecondary" component="p">
                                : Sanith Shetty 
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid container >
                        <Grid item xs={3}>
                            <Typography variant="h6" color="textSecondary" component="p">
                                Email 
                            </Typography>
                        </Grid>
                        <Grid item xs={9}>
                            <Typography variant="h6" color="textSecondary" component="p">
                                : sanithshetty143@gmail.com 
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid container >
                        <Grid item xs={3}>
                            <Typography variant="h6" color="textSecondary" component="p">
                                Mobile  
                            </Typography>
                        </Grid>
                        <Grid item xs={9}>
                            <Typography variant="h6" color="textSecondary" component="p">
                                : 9632389738 
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid item align="center">
                        <Button className={classes.button} variant="contained" color="secondary" onClick={() => history.push('/')}>
                            Back
                        </Button>
                    </Grid>  
                </CardContent> 
            </Card>
        </div>
    );
}
  
 export default Profile;