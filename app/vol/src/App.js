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
import moment from 'moment';
import ServiceList from './pages/util/service-list';
import AdminInfo from './pages/admin-info';
import BadgeList from './pages/util/badge/badge-list';
import SPOCBLDLabel from './pages/util/coupon-label';
import BadgePrint from './pages/util/badge/badge-print';
import BadgeIssueQR from './pages/util/badge/badge-issue-qr/index.js';
import Test from './pages/util/test/index.js';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PrasadamIssueQR from './pages/util/prasadam-issue-qr/index.js';
import BadgePreview from './pages/util/badge/badge-preview/index.js';

function App() {

  var [data, setData] = useState({})
  var [timestamp, setTimestamp] = useState({})
  var [dates, setDates] = useState([])
  var [isLoading, setIsLoading] = useState(true)

  var init = ()=>{
    new API().call()
    .then((res)=>{
      setData(res.data)
      setTimestamp(res.timestamp)
      setDates(res.data.events.map(e=>{
        return e.date
      }).sort())
      setIsLoading(false)
    })
    .catch(()=>{})
  }

  useEffect(()=>{
    init()
    setInterval(init, 2.5*60*1000)
  },[])

  return (
    <div className="App">
      <ToastContainer />
      <Router>
          <Routes>
            <Route path="/vol" element={<Vol data={data} dates={dates}/>}></Route>
            <Route path="/volist" element={<Vol data={data} dates={dates} showList/>}></Route>
            <Route path="/admin-info" element={<AdminInfo data={data} dates={dates} showList/>}></Route>
            <Route path="/ser" element={<Ser data={data} dates={dates}/>}></Route>
            <Route path="/services" element={<Ser data={data} dates={dates}/>}></Route>
            <Route path="/util/msg" element={<Msg data={data} isLoading={isLoading}/>}></Route>
            <Route path="/util/coupons" element={<SPOCBLD data={data} dates={dates}/>}></Route>
            <Route path="/util/service-list" element={<ServiceList data={data} dates={dates}/>}></Route>
            <Route path="/util/badge-list" element={<BadgeList data={data} dates={dates}/>}></Route>
            <Route path="/util/badge-print" element={<BadgePrint data={data} dates={dates}/>}></Route>
            <Route path="/util/badge-preview" element={<BadgePreview data={data} dates={dates}/>}></Route>
            <Route path="/util/coupon-label" element={<SPOCBLDLabel data={data} dates={dates}/>}></Route>
            <Route path="/util/badge-issue-qr" element={<BadgeIssueQR data={data} dates={dates}/>}></Route>
            <Route path="/util/prasadam-issue-qr" element={<PrasadamIssueQR data={data} dates={dates}/>}></Route>
            <Route path="/util/test" element={<Test data={data} dates={dates}/>}></Route>
            <Route path="/" element={<Home/>}></Route>
          </Routes>
      </Router>
      {(window.location.pathname!="/util/service-list"
        && window.location.pathname!="/util/badge-list"
        && window.location.pathname!="/util/badge-print"
        && window.location.pathname!="/util/badge-issue-qr"
        && window.location.pathname!="/util/prasadam-issue-qr"
        && window.location.pathname!="/util/coupon-label")
        && <div id="update-epoch">
        {`Data last updated at ${moment(timestamp).format("HH:mm A")}`}
      </div>}
    </div>
  );
}

export default App;
