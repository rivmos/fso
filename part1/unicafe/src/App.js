import { useState } from 'react'

const Heading = ({ text }) => <h3>{text}</h3>

const Button = (props) => <button onClick={props.handlClick}>{props.text}</button>

const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )

}
const Statistics = ({ good, neutral, bad }) => {
  const all = good + neutral + bad
  const average = (good + neutral - bad) / all
  const positive = good * 100 / all
  if (good === 0 && neutral === 0 && bad === 0) {
    return (<div>no feedback given</div>)
  }
  return (
    <table>
      <tbody>
        <StatisticLine text="good" value={good} />
        <StatisticLine text="neutral" value={neutral} />
        <StatisticLine text="bad" value={bad} />
        <StatisticLine text="all" value={all} />
        <StatisticLine text="average" value={average} />
        <StatisticLine text="positive" value={positive} />
      </tbody>
    </table>
  )
}

const App = () => {

  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)


  const handleGood = () => {
    setGood(good + 1)
  }

  const handleNeutral = () => {
    setNeutral(neutral + 1)
  }

  const handleBad = () => {
    setBad(bad + 1)
  }


  return (
    <div>
      <Heading text="give feedback" />
      <Button handlClick={handleGood} text='good' />
      <Button handlClick={handleNeutral} text='neutral' />
      <Button handlClick={handleBad} text='bad' />
      <Heading text="stats" />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App