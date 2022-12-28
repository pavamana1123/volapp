import './App.css';
import './strings.js'
import Vol from './pages/vol';
import Ser from './pages/ser';
import API from './api';
import {Route, BrowserRouter as Router, Routes} from "react-router-dom"
import { useEffect, useState } from 'react';
import Msg from './pages/util/msg';
import Home from './pages/home';
import SPOCBLD from './pages/util/spoc-bld';

function App() {

  var [data, setData] = useState({})
  var [dates, setDates] = useState([])
  var [isLoading, setIsLoading] = useState(true)

  var init = ()=>{
    new API()
    .setFunc("getData").setParams("1wkRjAARt8vKGpwWQwGt66tivKKFscHgfsttPdh7kf9I").call()
    .then((data)=>{
      setData(data)
      var d = {}
      data.services.forEach(s => {
        d[s.date]=null
      });
      setDates(Object.keys(d).map(d=>{ return d }).filter(d=>{ return d!="" }).sort())
      setIsLoading(false)
    })
    .catch(()=>{})
  }

  useEffect(()=>{
    init()
    setInterval(init,60*1000)
  },[])

  return (
    <div className="App">
    <Router>
        <Routes>
          <Route path="/vol" element={<Vol data={data} dates={dates}/>}></Route>
          <Route path="/volist" element={<Vol data={data} dates={dates} showList/>}></Route>
          <Route path="/ser" element={<Ser data={data} dates={dates}/>}></Route>
          <Route path="/services" element={<Ser data={data} dates={dates}/>}></Route>
          <Route path="/util/msg" element={<Msg data={data} isLoading={isLoading}/>}></Route>
          <Route path="/util/spocbld" element={<SPOCBLD data={data} dates={dates}/>}></Route>
          <Route path="/" element={<Home/>}></Route>
        </Routes>
    </Router>
    </div>
  );
}

export default App;
