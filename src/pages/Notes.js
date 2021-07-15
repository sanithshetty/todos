import React from 'react'
import { Typography, Container, CircularProgress } from '@material-ui/core'
import { useEffect } from 'react';
import { useState } from 'react';
import NoteCard from '../components/NoteCard';
import Masonry from 'react-masonry-css';

export default function Notes() {
  const [notes, setNotes] = useState(undefined)
  const [ondelete, setondelete] = useState(false)

  useEffect(() =>{
    fetch('https://firstproject-d29fe-default-rtdb.firebaseio.com/notes.json')
    .then(res => res.json())
    .then(data => { console.log(data)
      setNotes(data)
   })
  },[ondelete])

  const handleDelete = async (id) =>{
    await fetch(`https://firstproject-d29fe-default-rtdb.firebaseio.com/notes/${id}.json`, {
      method: 'DELETE'
    })
    setondelete(!ondelete)
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
        { Object.keys(notes).map(id =>(
            <div key={id}>
              <NoteCard note={notes} handleDelete={ handleDelete } id ={id}/>
            </div>
          ))}
      </Masonry>
      )}
      
    </Container>
  )
}
