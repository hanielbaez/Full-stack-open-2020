import React from 'react';
import ReactDOM from 'react-dom';

const Header = (props) => {
  return <h1>{props.course}</h1>
};

const Part = (props) => {
  return (
    <p>
      {props.element.name} {props.element.exercises}
    </p>
  )
}

const Content = (props) => {
  return props.parts.map(part => <Part element={part} />
  );
}

const Total = (props) => {
  const exercisesList = props.parts.map(part => part.exercises);
  return (
    <p>Number of exercises {exercisesList.reduce((a, b) => a + b, 0)}</p>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }


  return (
    <>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))