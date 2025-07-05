import Navbar from "./component/Navbar"
import Body from "./component/Body"
import Login from "./component/Login"
import {BrowserRouter,Routes,Route} from 'react-router-dom'

function App() {

  return (
    <BrowserRouter basename="/">
    <Routes>
      <Route path="/" element={<Body/>}>
      <Route path="/login" element={<Login/>}></Route>
      </Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App
