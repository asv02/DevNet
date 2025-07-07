import Navbar from "./component/Navbar";
import Body from "./component/Body";
import Login from "./component/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {appStore} from "./utils/appStore";
import {Provider} from 'react-redux'
import Profile from "./component/Profile";
import Feed from "./component/Feed"
import Connection from "./component/Connection";
import Requests from "./component/Requests";
import SignUp from "./component/SignUp";

function App() {
  return (
    <Provider store={appStore}>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Body/>}>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/Profile" element={<Profile/>}></Route>
            <Route path="/feed" element={<Feed/>}></Route>
            <Route path="/connection" element={<Connection/>}></Route>
            <Route path="/requests" element={<Requests/>}></Route>
          </Route>
          <Route path="/signup" element={<SignUp />}></Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
