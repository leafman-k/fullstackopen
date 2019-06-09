import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Header = () => {
    return (
        <div>
            <h1>Give feedback</h1>
        </div>
    )
}
const Statistic = ({text, value})=>{
    return (
        <tr>
            <td>{text}</td>
            <td>{value}</td>
        </tr>
    )
}
const Statistics = (props) => {
    if(props.all === 0){
        return (
            <div>
                <h2>Statistics</h2>
                <p>No feedback given</p>
            </div>
        )
    }

    return (
        <div>
            <h2>Statistics</h2>
                <table><tbody>
                    <Statistic text='Good:' value={props.good}/>
                    <Statistic text='Neutral:' value={props.neutral}/>
                    <Statistic text='Bad:' value={props.bad}/>
                    <Statistic text='All:' value={props.all}/>
                    <Statistic text='Average:' value={props.average}/>
                    <Statistic text='Positive:' value={props.positive}/>
                </tbody>
            </table>
        </div>
    )
}
const Button = ({ handleClick, text }) => (
    <button onClick={handleClick}>
        {text}
    </button>
)
const App = () => {

    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)
    const [all, setAll] = useState(0)
    const [average, setAverage] = useState(0)
    const [positive, setPositive] = useState('0 %')

    const handleClickGood = (value) => {
        setGood(value)
        setAll(all + 1)
        setAverage(((value  * 1) + (bad * -1))/ (all + 1))
        setPositive((value)/(all+1) * 100 + '%')

    }
    const handleClickNeutral = (value) => {
        setNeutral(value)
        setAll(all + 1)
        setAverage(((good  * 1) + (bad * -1))/ (all + 1))
        setPositive(good/(all+1) * 100+ '%')
    }
    const handleClickBad = (value) => {
        setBad(value)
        setAll(all + 1)
        setAverage(((good  * 1) + (value * -1))/ (all + 1))
        setPositive(good/(all+1) * 100 + '%')
    }



    return (
        <div>
            <Header/>
            <Button handleClick={()=>handleClickGood(good + 1)} text='good'/>
            <Button handleClick={()=>handleClickNeutral(neutral + 1)} text='neutral'/>
            <Button handleClick={()=>handleClickBad(bad + 1)} text='bad'/>

            <div>
                <Statistics good={good} neutral={neutral} bad={bad} all={all} average={average} positive={positive}/>
            </div>
        </div>
    )
}

ReactDOM.render(<App />,
    document.getElementById('root')
)
