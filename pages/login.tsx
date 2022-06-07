import React, { useState } from 'react'
import Alerts from '../components/Alerts'
import Login from '../components/Login'
import SignUp from '../components/SignUp'

const login = () => {
  const [flag, setFlag] = useState(false)
  
  const handleFlag = () => {
    setFlag(!flag)
  }
  return (
    <div >
      {!flag && <Login buttonName={"SignIn"} already={"singup"} handleFlage={ handleFlag}/>}
      {flag && <SignUp buttonName={"SignUp"} already={"SignIn"} handleFlag={ handleFlag}/>}
      <Alerts/>
    </div>
  )
}

export default login
