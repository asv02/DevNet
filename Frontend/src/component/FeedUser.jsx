import { useDispatch } from "react-redux";
import { BASE_URL } from "../utils/Constant";
import { addConnection, removeFeed } from "../utils/appSlice";
import { useState } from "react";

const FeedUser = ({ _id, firstName, lastName, about, photoUrl }) => {
  const dispatch = useDispatch();
  // console.log(_id," ", typeof(_id));
  const handleSend = async (status, _id) => {
    try {
      const data = await fetch(
        BASE_URL + "/request/send/" + status + "/" + _id,
        {
          method: "POST",
          credentials: "include",
        }
      );
      if (!data.ok) {
        return;
      }
      const res = data.json();
      console.log(_id," ", typeof(_id));
      dispatch(removeFeed(_id));
    } catch (err) {
      console.log("error in sending request->",err.message);
    }
  };

  return (
    <div className="w-full max-w-sm bg-white rounded-xl shadow-lg p-6 m-4 flex flex-col items-center transition hover:shadow-2xl">
      <img
        src={photoUrl}
        alt={`${firstName} ${lastName}`}
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = "https://randomuser.me/portraits/men/1.jpg";
        }}
        className="w-28 h-28 rounded-full object-cover border-4 border-blue-200 mb-4 shadow"
      />
      <h2 className="text-xl font-bold text-blue-700 mb-1">{firstName + " " + lastName}</h2>
      <p className="text-gray-600 mb-4 text-center">{about}</p>
      <div className="flex gap-4 mt-2">
        <button
          className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 transition font-semibold shadow"
          onClick={() => handleSend("Interested", _id)}
        >
          Interested
        </button>
        <button
          className="bg-gray-300 text-gray-800 px-5 py-2 rounded hover:bg-gray-400 transition font-semibold shadow"
          onClick={() => handleSend("Ignored", _id)}
        >
          Ignored
        </button>
      </div>
    </div>
  );
};

export default FeedUser;
