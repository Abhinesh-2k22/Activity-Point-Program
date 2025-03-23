import React from 'react'
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom'
import Home from './Pages/Home'
import Signin from './Pages/Signin'
import Signup from './Pages/Signup'
import Landingpage from './Pages/Landingpage'
import Getrentinghouse from './Pages/Getrentinghouse'
import GetserviceProvider from './Pages/GetserviceProvider'
import GetSaloon from './Pages/GetSaloon'

function App() {

  return (
    <>
    <Router>
      <div>
        <Routes>  
          <Route path='/' Component={Home}/>  
          <Route path='/signin' Component={Signin}/>
          <Route path='/signup' Component={Signup}/>
          <Route path='/landingPage' Component={Landingpage}/>
          <Route path='/getrenting' Component={Getrentinghouse}/>
          <Route path='/getservice' Component={GetserviceProvider}/>
          <Route path='/getsaloon' Component={GetSaloon}/>
        </Routes>  
      </div>
    </Router>
    </>
  )
}

export default App
