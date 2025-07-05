import { Outlet } from "react-router-dom";
import Footer from "./Footer"
import Navbar from "./Navbar"

const Body = ()=>
    {
        return (<>
        <Navbar/>
        Body Page
        <Outlet/>
        <Footer/>
        </>)
    }

export default Body;