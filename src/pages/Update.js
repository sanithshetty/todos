import React from 'react'
import {Typography, Button, Container, makeStyles, RadioGroup, FormControlLabel, CircularProgress} from '@material-ui/core'
import { FormControl, FormLabel } from '@material-ui/core'
import TextField from '@material-ui/core/TextField'
import { useState, useEffect } from 'react'
import { Radio } from '@material-ui/core'
import { useHistory } from 'react-router-dom'
import { useParams } from "react-router-dom";

const useStyles = makeStyles({
  field:{
    marginTop: 20,
    marginBottom: 20,
    display: 'block'
  },
  btn:{
    fontSize : 10,
    marginLeft: 10
  }
})

const Update = () => {
    const { id } = useParams();
    const classes = useStyles()
    const history = useHistory()
    const [note, setNote] = useState(undefined)
    const [title, setTitle] = useState('')
    const [details, setDetail] = useState('')
    const [titleErrors, setTitleError] = useState(false)
    const [detailErrors, setDetailError] = useState(false)
    const [category, setCategory] = useState('money')

    useEffect(() =>{
        fetch('http://localhost:8000/notes/' + id)
        .then(res => res.json())
        .then(data =>{
            setNote(data);
            setTitle(data.title);
            setDetail(data.details);
            setCategory(data.category);
        });
    }, [id])

    const handleUpdate = (e) =>{
        e.preventDefault()
        setTitleError(false)
        setDetailError(false)
        if(!title){
        setTitleError(true)
        }
        if(!details){
        setDetailError(true)
        }
        if(title && details){
        fetch('http://localhost:8000/notes/'+ id,{
            method: 'PUT',
            headers: { "Content-type":"application/json" },
            body: JSON.stringify({title, details, category})
        }).then(() => history.push('/'))
        }
    }
    return (
        <Container>
            <Typography
                variant = "h6"
                component = "h2"
                color = "textSecondary"
                gutterBottom
            >
                Update Note
            </Typography>
            {!note && <CircularProgress />}
            {note &&(
            <form noValidate autoComplete="off" onSubmit={handleUpdate}>
                <TextField 
                value = { title }
                onChange={(e)=> setTitle(e.target.value)}
                className={classes.field}
                id='outlined-basic' 
                label='Note Title' 
                variant='outlined' 
                fullWidth
                required
                error={titleErrors}
                />

                <TextField 
                value= { details }
                onChange={(e)=> setDetail(e.target.value)}
                className={classes.field}
                id='outlined-basic' 
                label='Note Details' 
                variant='outlined' 
                fullWidth
                multiline
                rows={3}
                required
                error={detailErrors}
                />

                <FormControl className={classes.field}>
                <FormLabel>Category</FormLabel>
                <RadioGroup value={category} onChange={(e) => setCategory(e.target.value)}>
                    <FormControlLabel value="money" control = {<Radio/>} label="Money"/>
                    <FormControlLabel value="todos" control = {<Radio/>} label="Todos"/>
                    <FormControlLabel value="reminders" control = {<Radio/>} label="Reminder"/>
                    <FormControlLabel value="work" control = {<Radio/>} label="Work"/>
                </RadioGroup>
                </FormControl>
                <div align="center">
                    <Button
                        className = {classes.btn}
                        type = "submit"
                        variant = "contained"
                        color = "secondary"
                    >
                        Update
                    </Button>
                    <Button
                        onClick = {() => history.push('/')}
                        className = {classes.btn}
                        variant = "contained"
                        color = "secondary"
                    >
                        Back
                    </Button>
                </div>
            </form>
            )}
        </Container>
    )
}
 
export default Update;