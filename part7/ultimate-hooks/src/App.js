import React from 'react'
import PersonForm from './components/PersonForm'
import { useResource, useField } from './hooks'

const NoteList = ({ notes }) => {
  return (
    <>
      {notes.map(note =>
        <p key={note.id}>{note.content}</p>)
      }
    </>
  )
}

const NoteForm = () => {
  const noteResource = useResource('notes')
  const content = useField('text')

  const handleClick = (event) => {
    event.preventDefault()

    const noteObject = {
      content: content.value
    }

    noteResource.createResource(noteObject)
    content.reset()

  }

  return (
    <div>
      <h2>notes</h2>
      <div>
        <input {...content} reset='' />
        <button onClick={handleClick} >create</button>
      </div>
      <NoteList notes={noteResource.value} />
    </div>
  )
}

const App = () => {
  return (
    <>
      <PersonForm />
      <NoteForm />
    </>
  )
}

export default App