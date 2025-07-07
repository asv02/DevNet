import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/Constant";
import { addRequests } from "../utils/appSlice";
import { useEffect } from "react";
import RequestedUser from "./RequestedUser"

const Requests = () => {



  const dispatch = useDispatch();
  const requests = async () => {

    try {
      const data = await fetch(BASE_URL + "/api/users/requests/received", {
        credentials: "include",
      });
      if (!data.ok) {
        return;
      }
      const res = await data.json();
      dispatch(addRequests(res));
    } catch (err) {
      console.log("Error in fetching request info:", err);
    }
  };

  useEffect(() => {
    requests();
  }, []);

  const requestForUser = useSelector((store) => store.requestReducer);
  console.log("requestForUser->", requestForUser);
  {
    return (<div>
        {requestForUser?.data?.filter((res)=>
        {
            return <RequestedUser requestedId = {res._id} firstName={res.fromUserId.firstName} lastName={res.fromUserId.lastName} photoUrl={res.fromUserId.photoUrl}/>
        })}</div>);
  }
};

export default Requests;
