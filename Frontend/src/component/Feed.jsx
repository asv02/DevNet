import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/Constant";
import { addFeed } from "../utils/appSlice";
import { useEffect } from "react";
import FeedUser from "./FeedUser";

const Feed = () => {
  const dispatch = useDispatch();
  const feedForUser = useSelector((store)=> store.feedReducer)

  const feedfetch = async () => {
    try {
        if(feedForUser.length>0) return "No Feed available";
      const feed = await fetch(BASE_URL + "/users/feed", {
        credentials: "include",
      });
      if (!feed.ok) {
        return;
      }
      const feedInJson = await feed.json();
      console.log("feedInJson.data->",feedInJson.data)
      dispatch(addFeed(feedInJson.data));
      console.log("feedForUser-",feedForUser)
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    feedfetch();
  }, []);

  return (
    <div className="flex flex-wrap gap-8 justify-center p-8 bg-gradient-to-br from-blue-50 to-blue-100 min-h-screen">
      {console.log("feedForUser in Feed->", feedForUser)}
      {feedForUser && feedForUser.length > 0 ? (
        feedForUser.map((feed) => (
          <div key={feed._id} className="w-full max-w-sm bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition">
            <FeedUser
              _id={feed._id}
              photoUrl={feed.photoUrl}
              firstName={feed.firstName}
              lastName={feed.lastName}
              about={feed.about}
            />
          </div>
        ))
      ) : (
        <div className="text-gray-500 text-lg font-semibold mt-16">No Feed available</div>
      )}
    </div>
  );
};

export default Feed;
