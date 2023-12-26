import { useState, useEffect } from "react";
import { Entry, ValidationError } from "./types";
import { getAllEntries, createEntry } from "./services/entryService";
import { AxiosResponse } from "axios";

const App = () => {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [newDate, setNewDate] = useState('');
  const [newVisbility, setNewVisibility] = useState('');
  const [newWeather, setNewWeather] = useState('');
  const [newComment, setNewComment] = useState('');
  const [errorMsg, setError] = useState<string>('');

  useEffect(() => {
    getAllEntries().then(data => {
      setEntries(data)
    })
  }, [])

  const isEntry = (object: Entry | AxiosResponse<ValidationError, Record<string, unknown>>): object is Entry => {
    return true;
  }
  const isError = (object: Entry | AxiosResponse<ValidationError, Record<string, unknown>>): object is AxiosResponse<ValidationError, Record<string, unknown>>  =>  {
    return true;
  }
  
  interface ErrorMessage {
    message: string;
  }

  const ErrorNotification = (props: ErrorMessage) => {
    if(!props || props.message === "undefined"){
      return null
    }
    return(
      <div>
        <h2 style={{color: "red"}}>{props.message}</h2>
      </div>
    )
  }

  const handleVisiblityChange = (value: string) => {
    setNewVisibility(value);
  };
  const handleWeatherChange = (value: string) =>{
    setNewWeather(value);
  };

  const entryCreation = async (event: React.SyntheticEvent) => {
    event.preventDefault()
    const newEntry = await createEntry({weather: newWeather, visibility: newVisbility, comment: newComment, date: newDate});
    if(newEntry !== undefined && isEntry(newEntry)){
      setEntries(entries.concat(newEntry));
      if(newEntry !== undefined && isError(newEntry)){
        const data = String(newEntry.data);
        setError(data);
        setTimeout(() =>{
          setError('')
        }, 2000)    
      }
    }
    setNewDate('');
    setNewComment('');
    setNewVisibility('');
    setNewWeather('');
  }

  return (
    <div>
      <h1>Add a new entry</h1>
      <ErrorNotification message={errorMsg}/>
      <form onSubmit={entryCreation}>
        <div>
          date<input
          type="date"
          value={newDate}
          onChange={(event) => setNewDate(event.target.value)}
          />
        </div>
        <div>
          visibility
          great<input
          type="radio"
          id="great"
          value="great"
          checked={newVisbility==="great"}
          onChange={() => handleVisiblityChange("great")}
          />
          good<input
          type="radio"
          id="good"
          value="good"
          checked={newVisbility==="good"}
          onChange={() => handleVisiblityChange("good")}
          />
          ok<input
          type="radio"
          id="ok"
          value="ok"
          checked={newVisbility==="ok"}
          onChange={() => handleVisiblityChange("ok")}
          />
          poor<input
          type="radio"
          id="poor"
          value="poor"
          checked={newVisbility==="poor"}
          onChange={() => handleVisiblityChange("poor")}
          />
        </div>
        <div>
          weather
          sunny<input
          type="radio"
          id="sunny"
          value="sunny"
          checked={newWeather==="sunny"}
          onChange={() => handleWeatherChange("sunny")}
          />
          rainy<input
          type="radio"
          id="rainy"
          value="rainy"
          checked={newWeather==="rainy"}
          onChange={() => handleWeatherChange("rainy")}
          />
          cloudy<input
          type="radio"
          id="cloudy"
          value="cloudy"
          checked={newWeather==="cloudy"}
          onChange={() => handleWeatherChange("cloudy")}
          />
          stormy<input
          type="radio"
          id="stormy"
          value="stormy"
          checked={newWeather==="stormy"}
          onChange={() => handleWeatherChange("stormy")}
          />
          windy<input
          type="radio"
          id="windy"
          value="windy"
          checked={newWeather==="windy"}
          onChange={() => handleWeatherChange("windy")}
          />
        </div>
        <div>
          comment<input
          value={newComment}
          onChange={(event) => setNewComment(event.target.value)}
          />
        </div>
        <button type="submit">add</button>
      </form>
      <h1>Diary entries</h1>
        {entries.map(entry =>
        <div key={entry.date}> 
          <h2>{entry.date}</h2>
          <p>visibility: {entry.visibility}</p>
          <p>weather: {entry.weather}</p>
        </div>
        )}
    </div>
  )
}
export default App;