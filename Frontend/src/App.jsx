import Navbar from "./component/Navbar";
import Body from "./component/Body";
import Login from "./component/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {appStore} from "./utils/appStore";
import {Provider} from 'react-redux'

function App() {
  return (
    <Provider store={appStore}>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Body />}>
            <Route path="/login" element={<Login />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
