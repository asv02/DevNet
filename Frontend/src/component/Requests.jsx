import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/Constant";
import { addRequests } from "../utils/appSlice";
import { useEffect } from "react";
import RequestedUser from "./RequestedUser"

const Requests = () => {

  const dispatch = useDispatch();
  const requests = async () => {

    try {
      const data = await fetch(BASE_URL + "/users/requests/received", {
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
  return (
    <div className="flex flex-wrap gap-8 justify-center p-8 bg-base-200 min-h-screen">
      {requestForUser?.data?.length > 0 ? (
        requestForUser.data.map((res) => (
          <RequestedUser
            key={res._id}
            requestedId={res._id}
            firstName={res.fromUserId.firstName}
            lastName={res.fromUserId.lastName}
            photoUrl={res.fromUserId.photoUrl}
            about={res.fromUserId.about}
          />
        ))
      ) : (
        <div className="text-base-content text-lg font-semibold mt-16">No Requests available</div>
      )}
    </div>
  );
};

export default Requests;
