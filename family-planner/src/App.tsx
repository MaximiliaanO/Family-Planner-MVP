import Calendar from './components/Calendar'
import LoginPage from './components/LoginPage'
import { useState } from 'react'

function App() 
{

  const [session, setSession] = useState(false)
  const [userId, setUserId] = useState("")

  return(
    session ? 
    (<Calendar setSession={setSession} userId={userId} />) :
    (<LoginPage setSession={setSession} setUserId={setUserId}/>)
  )
}

export default App
