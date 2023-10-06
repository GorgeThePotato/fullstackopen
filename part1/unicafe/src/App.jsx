import { useState } from 'react'

const Heading = ({text}) =>{
  return(
    <h1>{text}</h1>
  )
}
 const Button = ({text,onClick}) => {
  return(
    <button onClick={onClick}>{text}</button>
  )
 }

 const Statistics = (props) =>{
  if(props.feedback[3] == 0){
    return(
      <tbody><tr><td>No feedback given</td></tr></tbody>
    )
  }
  return(
    <tbody>
      <StatisticLine text="good" count={props.feedback[0]}/>
      <StatisticLine text="neutral" count={props.feedback[1]}/>
      <StatisticLine text="bad" count={props.feedback[2]}/>
      <StatisticLine text="all" count={props.feedback[3]}/>
      <StatisticLine text="average" count={props.feedback[4].reduce((a,b) => a+b,0)/props.feedback[4].length}/>
      <StatisticLine text="positive" count={(props.feedback[0]*100)/props.feedback[3]}/>
    </tbody>
  )
 }

 const StatisticLine = (props) =>{
  if(props.text == "positive"){
    return(
      <tr>
        <td>{props.text}</td>
        <td>{props.count}%</td>
      </tr>
    )
  }
  return(
    <tr>
      <td>{props.text}</td>
      <td>{props.count}</td>
    </tr>
  )
 }
 
const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [allFeedback, setAll] = useState(0);
  const [avgFeedback,setAvg] = useState([]);
  const feedback = [good,bad,neutral,allFeedback,avgFeedback];

  const handleGoodFeedback = () =>{
    const newFeedback = {
      good:setGood(good+1),
      allFeedback: setAll(allFeedback + 1),
      avgFeedback:setAvg(avgFeedback.concat(1))
    }
  }

  const handleNeutralFeedback = () =>{
    const newFeedback = {
      good:setNeutral(neutral + 1),
      allFeedback: setAll(allFeedback + 1),
      avgFeedback:setAvg(avgFeedback.concat(0))
    }
  }

  const handleBadFeedback = () =>{
    const newFeedback = {
      good:setBad(bad + 1),
      allFeedback: setAll(allFeedback + 1 ),
      avgFeedback:setAvg(avgFeedback.concat(-1))
    }
  }

  const positiveFeedback = () =>{
    if(allFeedback != 0){
      const positivePer = (100*good)/allFeedback;
      return positivePer +"%";
    }
    return 0;
  }

  return (
    <div>
      <Heading text="give feedback"/>
      <Button text="good" onClick={handleGoodFeedback}/>
      <Button text="neutral" onClick={handleNeutralFeedback}/>
      <Button text="bad" onClick={handleBadFeedback}/>
      <Heading text="statistics"/>
      <table><Statistics feedback={feedback}/></table>
    </div>
  )
}

export default App