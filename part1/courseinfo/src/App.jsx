const Header = (props) => {
  return(
    <h1>{props.name}</h1>
  )
};

const Content = (props) => {
  return(
    <div>
      <Part part={props.courseinfo[0].part} exercises={props.courseinfo[0].exercises}/>
      <Part part={props.courseinfo[1].part} exercises={props.courseinfo[1].exercises}/>
      <Part part={props.courseinfo[2].part} exercises={props.courseinfo[2].exercises}/>
    </div>
  )
};

const Part = (props) => {
  return(
    <p>
      {props.part} {props.exercises}
    </p>
  )
};

const Total = (props) => {
  return(
    <p>Number of exercises {props.exercises}</p>
  )
};

const App = () => {
  const course = 'Half Stack application development'
  const courseinfo = [
    { part :'Fundamentals of React', exercises:10},
    { part :'Using props to pass data', exercises:7},
    { part :'State of a component', exercises:14}
  ];

  return(
    <div>
      <Header name={course}/>
      <Content courseinfo={courseinfo}/>
      <Total exercises={courseinfo[0].exercises+courseinfo[1].exercises+courseinfo[2].exercises}/>
    </div>
  )
}
export default App