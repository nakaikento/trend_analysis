import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
import Grid from '@material-ui/core/Grid';
import Tags from './Tags.js'
import SearchBar from './SearchBar.js'
// import TimePicker from './TimePicker.js'
// TimePicker
import 'date-fns';
import { makeStyles } from '@material-ui/core/styles';
// import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

const base_url = 'http://localhost:5000/plot?';
const useStyles = makeStyles(theme => ({
  root: {
    width: 300,
    display: "inline-block",
  },
}));

function App() {
  const [query, setQuery] = useState("");
  const [prefecture, setPrefecture] = useState("すべて");
  const [start, setStart] = useState("2019-01-01");
  const [end, setEnd] = useState("2019-09-30");
  const [data, setData] = useState("")

  const urlize = (query, prefecture, start, end) => {
    let query_sentence =
      "query=" + query +
      "&prefecture=" + prefecture +
      "&start=" + start +
      "&end=" + end
    return query_sentence

  }


  function plot() {
  // Buid query parameter
      // let param = {};
      // param["query"] = query;
      // param["prefecture"] = prefecture;
      // param["start"] = start;
      // param["end"] = end;
    const query_sentence = urlize(query, prefecture, start, end);
      // /plot?query=あきたこまち&prefecture=秋田&start=2015-01-01&end=2019-09-30

  // Query with a new parameter
    const result = axios.get(base_url + query_sentence);
    setData(result);
    document.getElementById("plotimg").src = data;
      //
      // $.get("/plot" + "?" + query_sentence, function(data) {
      //     document.getElementById("plotting").src = data;
      // });
  };

  return (
    <div>
      <div className="home-page-top-container" style={{textAlign: "center", height: 480, backgroundColor: "#0f7d6c"}}>
        <p className="home-page-title" style={{fontSize: 50, color: "#FFFFFF", paddingTop: 30, paddingLeft: 100, paddingRight: 100}} >
          農家の間で話題になっているものをチェックしましょう
        </p>
        <div className="home-page-filter" style={{display:"flex", paddingBottom: 80}}>
          <Tags prefecture={{prefecture}}/>
          <TimePicker className="start-day" label="開始日" />
          <TimePicker className="end-day" label="終了日" />
        </div >
        <div className="home-page-search">
          <Grid container spacing={2} justify="center"><SearchBar query={{query}}/></Grid>
        </div>
      </div>
      <button type="button" onClick={() => plot()}>
        Search
      </button>
      <div className="home-page-bottom-container">
        <img id='plotimg'/>
      </div>
    </div>
    // <div className="App" style={{padding: '50px 100px'}}>
    //     <h1>TACシステム</h1>
    //     <div className="topContainer">
    //       <TimePicker />
    //       <Text />
    //     </div>
    //     <div className="bottomContainer" style={{marginTop: '100px'}}>
    //       <div className='taskBox' styles={{marginTop: '300px'}}>
    //         <NestedGrid />
    //         <br/>
    //         <SimpleBackdrop label='登録' />
    //       </div>
    //     </div>
    // </div>
  );
}

export default App;
