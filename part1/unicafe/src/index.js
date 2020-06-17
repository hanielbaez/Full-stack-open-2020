import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ handleClick, text }) => <button onClick={handleClick}>{text}</button>

const Statistic = ({ value, text }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}


const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => setGood(good + 1)
  const handleNeutralClick = () => setNeutral(neutral + 1)
  const handleBadClick = () => setBad(bad + 1)

  //helper function
  const total = (good + neutral + bad)

  if (total) {
    return (
      <>
        <h1>give feedback</h1>
        <div>
          <Button handleClick={handleGoodClick} text='good' />
          <Button handleClick={handleNeutralClick} text='neutral' />
          <Button handleClick={handleBadClick} text="bad" />
        </div>

        <h2>statistics</h2>
        <table>
          <tbody>
            <Statistic value={good} text='good' />
            <Statistic value={neutral} text='neutral' />
            <Statistic value={bad} text='bad' />
            <Statistic value={total} text='all' />
            <Statistic value={(good - bad) / total} text='average' />
            <Statistic value={(good / total) + ' %'} text='positive' />
          </tbody>
        </table>
      </>
    )
  } else {
    return (
      <>
        <h1>give feedback</h1>
        <div>
          <Button handleClick={handleGoodClick} text='good' />
          <Button handleClick={handleNeutralClick} text='neutral' />
          <Button handleClick={handleBadClick} text="bad" />
        </div>
        <p>No feedback given</p>
      </>
    )
  }


}

ReactDOM.render(<App />, document.getElementById('root'))