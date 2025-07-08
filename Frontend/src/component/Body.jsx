import { Outlet, useNavigate } from "react-router-dom";
import Footer from "./Footer";
import Navbar from "./Navbar";
import { BASE_URL } from "../utils/Constant";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/appSlice";
import { useEffect } from "react";
import { appStore } from "../utils/appStore";

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleUser = async () => {
    try {
      const user = await fetch(BASE_URL + "/user/getUser", {
        credentials: "include",
      });
      if (!user.ok) {
        throw new Error("Cannot get User");
      }
      const res = await user.json();
      console.log(res);
      dispatch(addUser(res));
      return res;
    } catch (err) {
      console.log("Error->", err.message);
      return navigate("/login");
    }
  };

  useEffect(() => {
    handleUser().then(() => {
      console.log("Redux state after fetch:", appStore.getState());
    });
  }, []);

  {
    return (
      <>
        <Navbar />
        Body Page
        <Outlet />
        <Footer />
      </>
    );
  }
};

export default Body;
