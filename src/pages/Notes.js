import React from 'react'
import { Typography, Container, Button, CircularProgress } from '@material-ui/core'
import SendTwoToneIcon from '@material-ui/icons/SendTwoTone';
import { useEffect } from 'react';
import { useState } from 'react';
import NoteCard from '../components/NoteCard';
import Masonry from 'react-masonry-css';
import { useHistory } from 'react-router';

export default function Notes() {
  const [notes, setNotes] = useState(undefined)
  const history = useHistory()

  useEffect(() =>{
    fetch('http://localhost:8000/notes')
    .then(res => res.json())
    .then(data => setNotes(data))
  },[])

  const handleDelete = async (id) =>{
    await fetch('http://localhost:8000/notes/'+ id, {
      method: 'DELETE'
    })

    const newNotes = notes.filter(note => note.id != id)
    setNotes(newNotes)
  }

  const breakpoints = {
    default : 4,
    1300: 3,
    1100: 2,
    700: 1
  }

  return (
    <Container>
      <Typography
        variant = "h6"
        component = "h2"
        color = "textSecondary"
        gutterBottom
      >
        Note details
      </Typography>

      {!notes && <CircularProgress/>}

      {notes &&(
      <Masonry
        breakpointCols={breakpoints}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        { notes.map(note =>(
            <div key={note.id}>
              <NoteCard note={note} handleDelete={ handleDelete }/>
            </div>
          ))}
      </Masonry>
      )}
      
    </Container>
  )
}

{/* <Grid container spacing={1}>
        { notes.map(note =>(
          <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={note.id}>
            <NoteCard note={note} handleDelete={ handleDelete }/>
          </Grid>
        ))}
      </Grid> */}