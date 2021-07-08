import React from "react";
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import { DeleteOutlined } from "@material-ui/icons";
import { makeStyles, Typography, Avatar, Tooltip } from "@material-ui/core";
import { green, pink, red, yellow } from "@material-ui/core/colors";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    
    avatar:{
        backgroundColor: (note) =>{
            if(note.category == 'work'){
                return yellow[700]
            }
            if(note.category == 'money'){
                return red[700]
            }
            if(note.category == 'todos'){
                return green[500]
            }
            if(note.category == 'reminders'){
                return pink[500]
            }
        }
    }
}))

const NoteCard = ({note, handleDelete}) => {
    const classes = useStyles(note)
    const history = useHistory()
    return ( 
        <div>
            <Card elevation={4} >
                <CardHeader
                    avatar = {
                        <Avatar className={classes.avatar}>
                            {note.category[0].toUpperCase()}
                        </Avatar>
                    }
                    action={
                        <Tooltip title="Delete">
                            <IconButton onClick={() => handleDelete(note.id)}>
                                <DeleteOutlined />
                            </IconButton>
                        </Tooltip>
                    }
                    title={note.title}
                    subheader={note.category}
                />
                <CardContent onClick={() => history.push(`/update/${note.id}`)}>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {note.details}
                    </Typography>
                </CardContent>
            </Card>
        </div>
     );
}
 
export default NoteCard;