import React from 'react'

const Part = ({ part, exercises }) => <p>
  {part} {exercises}
</p>

const Content = ({ parts }) => {
  return (
    <>
      {
        parts.map(part =>
          <Part key={part.id} part={part.name} exercises={part.exercises} />
        )
      }
    </>
  )
}

export default Content