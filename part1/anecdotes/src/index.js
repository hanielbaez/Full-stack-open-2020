import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ handleClick, text }) => {
  return (
    <button onClick={handleClick}>
      {text}
    </button>
  )
}

const MostVote = ({ votes }) => {
  const index = votes.indexOf(Math.max(...votes))
  return (
    <>
      <h2>Anecdote with most votes</h2>
      <p>{anecdotes[index]}</p>
    </>
  )
}

const App = ({ anecdotes }) => {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))

  const handleRandomClick = () => {
    const random = Math.floor(Math.random() * anecdotes.length)
    setSelected(random)
  }

  const handleVoteClick = () => {
    const temp = [...votes]
    temp[selected] += 1
    setVotes(temp)
  }

  return (
    <>
      <h1>Anecdote of the day</h1>
      {anecdotes[selected]}
      <div>
        <Button handleClick={handleVoteClick} text='vote' />
        <Button handleClick={handleRandomClick} text='next anecdote' />
      </div>
      <MostVote votes={votes} />
    </>
  )

}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById('root'))