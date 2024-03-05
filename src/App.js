import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import moment from 'moment'

function App() {
  const [hours, setHours] = useState(0);
  const [finalHours, setFinalHours] = useState(['', '']);
  

  const getFinishHour = (shift) => {
    if(shift === "morning2"){
      return "2:30";
    }
    else if(shift === "morning4")
    {
      return "4:30";
    }
    return "21:30";
  }

  const getStartHour = (shift) => {
    if(shift === "two-shift"){
      return "14:30:00";
    }
    else if(shift === "four-shift")
    {
      return "16:30:00";
    }
    else if(shift === "midshift")
    {
      return "11:30:00";
    }
    return "09:30:00";
  }

  const calculate = () => {
    const shift = document.getElementById("shifts").value;
    const hoursLeft = 40 - hours;
    /* The date use is not relevant what matter is the time */
    const addHoursWithBreak = moment('2016-03-12 ' + getStartHour(shift)).add(hoursLeft+0.5, 'hours').format('LLL');
    const finishTimeWithBreak = addHoursWithBreak.split(' ');

    const addHoursNoBreak = moment('2016-03-12 ' + getStartHour(shift)).add(hoursLeft, 'hours').format('LLL');
    const finishTimeNoBreak = addHoursNoBreak.split(' ');

    setFinalHours([finishTimeWithBreak[3] + ' ' + finishTimeWithBreak[4], finishTimeNoBreak[3] + ' ' + finishTimeNoBreak[4]]) 
  }
  return (
    <div className='main'>
    <h1> Check Overtime </h1>
      <div className='main-form'>
        <div>
          <p>Initial Hours: </p>
          <input type='number' inputmode="decimal" value={hours} onChange={(e) => {
            if(e.target.value >= 0)
            {
              setHours(e.target.value);
            }
          }}></input>
        </div>
        <div>
          <p>Shift: </p>
          <select name="shifts" id="shifts">
            <option value="double-shift">9:30-cl</option>
            <option value="morning2">9:30-2:30</option>
            <option value="morning4">9:30-4:30</option>
            <option value="midshift">11-30-9:30</option>
            <option value="two-shift">2:30-cl</option>
            <option value="four-shift">4:30-cl</option>
          </select>
        </div>
        
        <button className='main-button' onClick={calculate}>Calculate</button>
      </div>
      <div className='main-form'>
        <h2>Clock out at:</h2>
        <p>With Break: {finalHours[0]}</p>
        <p>Without Break: {finalHours[1]}</p>
        
      </div>
    </div>
  )
}

export default App
