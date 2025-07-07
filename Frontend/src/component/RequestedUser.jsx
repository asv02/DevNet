import { useDispatch } from "react-redux";
import { BASE_URL } from "../utils/Constant";
import { addConnection } from "../utils/appSlice";
import { useState } from "react";

const RequestedUser = ({requestedId, firstName, lastName, about, photoUrl }) => {
    const [butttons,setButtons] = useState(true);
    const dispatch = useDispatch();
    
    const handleRecieve = async (status, requestedId) => {
    const data = await fetch(
      BASE_URL + "/api/request/review/" + status + "/" + requestedId,
      {
        method:"POST",
        credentials: "include",
      }
    );
    if (!data.ok) {
      return;
    }
    const res = data.json();
    if(status == 'Accepted')
        {
            dispatch(addConnection(res))
        }
    setButtons(false)
  };

  return (
    <>
      <div className="card bg-base-100 w-96 shadow-sm m-3">
        <figure className="px-10 pt-10">
          <img
            src={photoUrl}
            alt={`${firstName} ${lastName}`}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "https://randomuser.me/api/portraits/men/1.jpg";
            }}
            className="w-24 h-24 rounded-full object-cover border-2 border-gray-300 mb-2"
          />
        </figure>
        <div className="card-body items-center text-center">
          <h2 className="card-title">{firstName + " " + lastName}</h2>
          <p>{about}</p>
          {butttons && <div className="card-actions">
            <button className="btn btn-primary" onClick={()=>handleRecieve('Accepted',requestedId)}>Accepted</button>
            <button className="btn btn-secondary" onClick={()=>handleRecieve('Rejected',requestedId)}>Rejected</button>
          </div>}
        </div>
      </div>
    </>
  );
};

export default RequestedUser;
