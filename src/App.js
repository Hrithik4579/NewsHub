import './App.css';
import React, { useState } from 'react'
import NavBar from './components/NavBar';
import News from './components/News';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'

const App=()=> {
  const [apiKey,setapiKet]=useState(process.env.REACT_APP_NEWS_API)
  const [progress,setProgress]=useState(0);
 
  const setprogress=(progress)=>{
    setProgress(progress);
  }
    return (
      <div>
        <Router>
        <NavBar/>
        <LoadingBar
        color='#f11946'
        height={4}
        progress={progress}
      />
        <Routes>
          <Route exact path="/" element={<News apiKey={apiKey} setProgress={setprogress} key="home" pageSize={9} country="in" category="General"/>}></Route>
          <Route exact path="/business" element={<News apiKey={apiKey} setProgress={setprogress} key="business" pageSize={9} country="in" category="Business"/>}></Route>
          <Route exact path="/entertainment" element={<News apiKey={apiKey} setProgress={setprogress} key="entertainment" pageSize={9} country="in" category="Entertainment"/>}></Route>
          <Route exact path="/general" element={<News apiKey={apiKey} setProgress={setprogress} key="general" pageSize={9} country="in" category="General"/>}></Route>
          <Route exact path="/health" element={<News apiKey={apiKey} setProgress={setprogress} key="health" pageSize={9} country="in" category="Health"/>}></Route>
          <Route exact path="/science" element={<News apiKey={apiKey} setProgress={setprogress} key="science" pageSize={9} country="in" category="Science"/>}></Route>
          <Route exact path="/sports" element={<News apiKey={apiKey} setProgress={setprogress} key="sports" pageSize={9} country="in" category="Sports"/>}></Route>
          <Route exact path="/technology" element={<News apiKey={apiKey} setProgress={setprogress} key="technology" pageSize={9} country="in" category="Technology"/>}></Route>

        </Routes>
        </Router>
      </div>
    )
  
}
export default App